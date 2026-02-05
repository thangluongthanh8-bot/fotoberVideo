'use client'

import Fadein from '@/app/components/animations/Fadein'
import LightSpeedInLeft from '@/app/components/animations/LightSpeedInLeft'
import Button from '@/app/components/commons/Button'
import FormSuccess from '@/app/components/FormSuccess'
import { clientDirectus } from '@/app/utils/ultils'
import { uploadToGoogleDrive, formatFileSize } from '@/app/utils/googleDriveUpload'
import { uploadFiles, createItem } from '@directus/sdk'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import iconUpload1 from './assets/icon-upload-1.png'
import imageStep3 from './assets/step-1.png'
import imageStep2 from './assets/step-2.png'
import imageStep1 from './assets/step-3.png'

type LinkInput = {
  link: string
}

type FormValues = {
  name: string
  email: string
  phoneNumber: string
  service: string
  description?: string
  imagePreview?: string
  list_link_share?: LinkInput[]
  video_link?: string
}

interface FileUploadResponse {
  id: string
  storage: string
  filename_disk: string
  filename_download: string
  title: string | null
  type: string
  folder: string | null
  uploaded_by: string | null
  uploaded_on: string
  modified_by: string | null
  modified_on: string | null
  charset: string | null
  filesize: number
  width: number | null
  height: number | null
  duration: number | null
  embed: string | null
  description: string | null
  location: string | null
  tags: string | null
}

function SessionContact({
  isHideButton,
  isFromVideoTrial,
}: {
  isHideButton?: boolean
  isFromVideoTrial?: boolean
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      list_link_share: [{ link: '' }],
    },
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSource = searchParams.get('utm_source')
  const currentMedium = searchParams.get('utm_medium')
  const currentCampaign = searchParams.get('utm_campaign')
  const currentContent = searchParams.get('utm_content')
  const currentTerm = searchParams.get('utm_term')

  // File upload states
  const [files, setFiles] = useState<{ preview: string; fileName: string; fileData: File }[]>([])
  const [isUploadFileError, setIsUploadFileError] = useState<boolean>(false)
  const [isErrorSubmitForm, setIsErrorSubmitForm] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  // Video upload states (simplified)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isUploadingVideo, setIsUploadingVideo] = useState<boolean>(false)
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null)
  const [uploadedVideoLink, setUploadedVideoLink] = useState<string | null>(null)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list_link_share',
  })

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            fileName: file.name,
            fileData: file,
          }),
        ),
      )
      setIsUploadFileError(false)
    },
  })

  // Video dropzone for Google Drive upload (no compression)
  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    noDrag: true,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm', '.mkv'],
    },
    maxFiles: 1,
    maxSize: 300 * 1024 * 1024, // 300MB
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        const error = rejection.errors[0]
        if (error.code === 'file-too-large') {
          setVideoUploadError('File is too large. Maximum size is 300MB.')
        } else {
          setVideoUploadError(error.message)
        }
      })
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return

      // Reset states
      setVideoFile(file)
      setVideoUploadError(null)
      setUploadedVideoLink(null)
      setIsUploadingVideo(true)

      try {
        // Upload directly to Google Drive (no compression)
        const result = await uploadToGoogleDrive({ file })

        if (result.success && result.viewLink) {
          setUploadedVideoLink(result.viewLink)
        } else {
          setVideoUploadError(result.error || 'Upload failed')
        }
      } catch (error) {
        setVideoUploadError('Failed to upload video. Please try again.')
        console.error('Video upload error:', error)
      } finally {
        setIsUploadingVideo(false)
      }
    },
  })

  const onCreateContact: SubmitHandler<FormValues> = React.useCallback(
    async (dataSubmit) => {
      if (files.length > 0) {
        setLoading(true)
        const listImage = (await Promise.all(
          [...files].map(async (file) => {
            const formData = new FormData()
            formData.append('folder', 'd5c07074-22f6-4f0b-8afb-1d7f3d7769ca')
            formData.append('file', file.fileData)
            try {
              return await clientDirectus.request(uploadFiles(formData))
            } catch (error) {
              setIsUploadFileError(true)
              throw error
            }
          }),
        )
          .catch(() => {
            setIsUploadFileError(true)
          })
          .then((res) => {
            return res
          })) as FileUploadResponse[]

        const imageMap = listImage?.map((i) => {
          return {
            contact_form_home_id: '+',
            directus_files_id: {
              id: i.id,
            },
          }
        })
        try {
          await clientDirectus.request(
            createItem('contact_form_home', {
              name: dataSubmit.name,
              email: dataSubmit.email,
              phone_number: dataSubmit.phoneNumber,
              description: dataSubmit?.description,
              category: dataSubmit.service,
              list_link_share: dataSubmit?.list_link_share,
              video_link: uploadedVideoLink || undefined,
              utm_source: currentSource,
              utm_medium: currentMedium,
              utm_campaign: currentCampaign,
              utm_content: currentContent,
              utm_term: currentTerm,
              list_image: {
                create: imageMap,
              },
            }),
          )
        } catch {
          setIsErrorSubmitForm(true)
        } finally {
          setLoading(false)
          setIsSuccess(true)
          if (!isHideButton) {
            router.push('/thank-you')
          }
          setIsErrorSubmitForm(false)
        }
      } else {
        setLoading(true)
        try {
          await clientDirectus.request(
            createItem('contact_form_home', {
              name: dataSubmit.name,
              email: dataSubmit.email,
              phone_number: dataSubmit.phoneNumber,
              description: dataSubmit?.description,
              category: dataSubmit.service,
              utm_source: currentSource,
              utm_medium: currentMedium,
              utm_campaign: currentCampaign,
              utm_content: currentContent,
              utm_term: currentTerm,
              list_link_share: dataSubmit?.list_link_share,
              video_link: uploadedVideoLink || undefined,
            }),
          )
        } catch {
          setIsErrorSubmitForm(true)
        } finally {
          setLoading(false)
          setIsSuccess(true)
          if (!isHideButton) {
            router.push('/thank-you')
          }
          setIsErrorSubmitForm(false)
        }
      }
    },
    [
      currentSource,
      currentMedium,
      currentCampaign,
      currentContent,
      currentTerm,
      files,
      isHideButton,
      router,
      uploadedVideoLink
    ],
  )

  const onResetData = useCallback(() => {
    void reset({})
    setIsSuccess(false)
    setFiles([])
  }, [reset])

  const onWrapResetData = useCallback(() => {
    void onResetData()
    router.push('/')
  }, [onResetData, router])

  useEffect(() => {
    if (isSuccess && !isHideButton) {
      onResetData()
    }
  }, [isHideButton, isSuccess, onResetData])

  return (
    <div className="w-full bg-[#043263] flex flex-col md:flex-row items-center font-montserrat justify-center px-4 py-10">
      <div className="container-custom  w-full flex flex-col md:flex-row justify-between gap-6">
        <div className="info w-full md:w-[35%]">
          <LightSpeedInLeft>
            <h2 className="text-white font-bold text-[28px]">
              Did not find something in our menu or looking for a custom job?
            </h2>
          </LightSpeedInLeft>
          <Fadein>
            <p className="text-xl text-white pt-6">
              No worries, we have got it covered. Just submit your requirement by filling this
              simple form and our team will get back to you soon.
            </p>
          </Fadein>
          <div className="flex flex-row items-center gap-4 pt-6">
            <Image alt="fotober" src={imageStep1} className="w-[45px] h-[45px] invert brightness-200" />
            <p className="text-white text-[21px]">Fill the form</p>
          </div>
          <div className="flex flex-row items-center gap-4 pt-4">
            <Image alt="fotober" src={imageStep2} className="w-[45px] h-[45px] invert brightness-200" />
            <p className="text-white text-[21px] border-b border-white">
              {isFromVideoTrial ? 'Share a link video' : 'Upload the images'}
            </p>
          </div>
          <div className="flex flex-row items-center gap-4 pt-4">
            <Image alt="fotober" src={imageStep3} className="w-[45px] h-[45px] invert brightness-200" />
            <p className="text-white text-[21px]">Get the quote</p>
          </div>
          {!isHideButton && (
            <Link href="/start-free-trial">
              <Button className=' text-white btn-bg-primary rounded-[5px] p-2 mt-7 w-max' title="MORE ABOUT OUR SERVICES" />
            </Link>
          )}
        </div>
        <form
          className="info w-full md:w-[50%] flex flex-col gap-4"
          onSubmit={handleSubmit(onCreateContact)}
        >
          {isSuccess ? (
            <FormSuccess onReset={onWrapResetData} />
          ) : (
            <>
              <div>
                <p className="text-white font-semibold text-xl pb-1">Name*</p>
                <input
                  {...register('name', { required: true, maxLength: 80 })}
                  placeholder="For example: John Wick"
                  className={twMerge(
                    'border-solid border-[1.5px] outline-0 w-full rounded-[12px] px-4 h-[45px] bg-transparent text-white placeholder:text-white/60',
                    errors.name
                      ? 'border-[#FE2E2E] [boxShadow:_0px_0px_10px_0px_rgba(254,46,46,0.5)]'
                      : 'border-white/40 [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)]',
                  )}
                />
                {errors.name && (
                  <p className="text-[#FE2E2E] text-sm mt-2 text-left">The field is required.</p>
                )}
              </div>
              <div>
                <p className="text-white font-semibold text-xl pb-1">Email*</p>
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  placeholder="For example: JohnWick@gmail.com"
                  className={twMerge(
                    'border-solid border-[1.7px] outline-0 w-full rounded-[12px] px-4 h-[45px] bg-transparent text-white placeholder:text-white/60',
                    errors.email
                      ? 'border-[#FE2E2E] [boxShadow:_0px_0px_10px_0px_rgba(254,46,46,0.5)]'
                      : 'border-white/40 [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)]',
                  )}
                />
                {errors.email && (
                  <p className="text-[#FE2E2E] text-sm mt-2 text-left">The field is required.</p>
                )}
              </div>
              <div>
                <p className="text-white font-semibold text-xl pb-1">Phone number*</p>
                <input
                  {...register('phoneNumber', {
                    required: 'The field is required.',
                    maxLength: 50,
                    minLength: {
                      value: 8,
                      message: 'Phone number is not in correct format',
                    },
                    pattern: {
                      value: /^(?=.*\d).+$/,
                      message: 'Phone number is not in correct format',
                    },
                  })}
                  placeholder="For example: +123456789"
                  className={twMerge(
                    'border-solid border-[1.7px] outline-0 w-full rounded-[12px] px-4 h-[45px] bg-transparent text-white placeholder:text-white/60',
                    errors.phoneNumber
                      ? 'border-[#FE2E2E] [boxShadow:_0px_0px_10px_0px_rgba(254,46,46,0.5)]'
                      : 'border-white/40 [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)]',
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-[#FE2E2E] text-sm mt-2 text-left">The field is required.</p>
                )}
              </div>
              <div className="flex flex-col gap-4 justify-center items-center">
                <textarea
                  {...register('description')}
                  placeholder="Write your message here along with"
                  className="border-white/40 border-solid border-[1.7px] outline-0 w-full rounded-[12px] p-4 h-[100px] [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)] bg-transparent text-white placeholder:text-white/60"
                />

                {/* Video Upload Section */}
                <div className="w-full">
                  <p className="text-white font-semibold text-lg pb-2">Upload Video (Optional)</p>
                  <div className="container">
                    <div
                      {...getVideoRootProps({
                        className: 'dropzone',
                        onDrop: (event) => event.stopPropagation(),
                      })}
                    >
                      <input {...getVideoInputProps()} />
                      {isUploadingVideo ? (
                        <div className="w-full flex flex-col items-center justify-center gap-3 border-white/40 border-solid border-[1.5px] rounded-[12px] p-4 h-[120px]">
                          <p className="text-white text-sm">
                            📤 Uploading: {videoFile?.name}
                          </p>
                          <p className="text-white/60 text-xs">
                            {formatFileSize(videoFile?.size || 0)}
                          </p>
                          {/* Indeterminate processing bar */}
                          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                            <div className="h-3 bg-green-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite] w-1/3" />
                          </div>
                          <span className="font-bold text-green-400 text-sm">Processing...</span>
                        </div>
                      ) : uploadedVideoLink ? (
                        <div className="w-full flex flex-row items-center gap-4 border-green-500 border-solid border-[1.5px] rounded-[12px] p-4 h-[80px]">
                          {/* Success icon */}
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-green-500 font-semibold text-sm">Upload thành công!</p>
                            <p className="text-white text-sm truncate" title={videoFile?.name}>{videoFile?.name}</p>
                            <p className="text-white/60 text-xs">{formatFileSize(videoFile?.size || 0)}</p>
                          </div>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setVideoFile(null)
                              setUploadedVideoLink(null)
                            }}
                            className="text-red-400 hover:text-red-300 p-2 flex-shrink-0"
                            title="Xóa video"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div
                          className={twMerge(
                            'w-full flex flex-col items-center justify-center gap-4 border-solid border-[1.5px] rounded-[12px] p-4 h-[120px] cursor-pointer hover:border-white/60 transition-all',
                            videoUploadError
                              ? 'border-[#FE2E2E] [boxShadow:_0px_0px_10px_0px_rgba(254,46,46,0.5)]'
                              : 'border-white/40 [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)]',
                          )}
                        >
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <div className="flex flex-row items-center border-white/40 gap-3 rounded-[12px] border-solid border-[1px] p-2">
                            <Image alt="fotober" src={iconUpload1} className="w-[16px] h-[16px] invert brightness-200" />
                            <p className="text-base text-white font-semibold">Upload video</p>
                          </div>
                          <p className="text-white/50 text-xs">Max 300MB</p>
                        </div>
                      )}
                    </div>
                    {videoUploadError && (
                      <p className="text-[#FE2E2E] text-sm mt-2">{videoUploadError}</p>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex flex-row items-center gap-4 mb-3">
                      <input
                        {...register(`list_link_share.${index}.link` as const, {
                          required: files.length === 0 && !uploadedVideoLink,
                        })}
                        placeholder={isFromVideoTrial ? 'Share a video link' : 'Share a link'}
                        className={twMerge(
                          'border-solid border-[1.5px] outline-0 w-full rounded-[12px] px-4 h-[45px] [boxShadow:_5px_5px_5px_0px_#000000a1] bg-transparent text-white placeholder:text-white/60',
                          errors.list_link_share && files.length === 0 && !uploadedVideoLink
                            ? ' border-[#FE2E2E] [boxShadow:_0px_0px_10px_0px_rgba(254,46,46,0.5)]'
                            : ' border-white/40 [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)]',
                        )}
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="w-[50px] bg-[#043263] rounded-[8px] h-[50px] text-white text-[28px]"
                          onClick={() => remove(index)}
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="w-[50px] bg-[#043263] rounded-[8px] h-[50px] text-white text-[28px] invert brightness-200"
                    onClick={() => append({ link: '' })}
                  >
                    +
                  </button>
                </div>
                {errors.list_link_share && files.length === 0 && (
                  <p className="text-[#FE2E2E] w-full text-sm  text-left">
                    Please upload an image or share a link
                  </p>
                )}
                {isUploadFileError && (
                  <p className="text-[#FE2E2E] text-sm mt-2 text-left">
                    Error during file upload. Please check your file (only image files up to 5MB are
                    accepted)
                  </p>
                )}
                <Button
                  disabled={loading}
                  loading={loading}
                  type="submit"
                  title="SUBMIT"
                  wrapClassName="min-w-[150px] btn-bg-primary rounded-[5px]"
                />
                {isErrorSubmitForm && (
                  <p className="text-[#FE2E2E] text-sm mt-2 text-left">
                    An error occurred during the submission process. Please try again or contact us
                    via email at contact@fotober.com.
                  </p>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default SessionContact
