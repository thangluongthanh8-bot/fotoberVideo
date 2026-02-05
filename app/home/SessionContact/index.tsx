'use client'

import Fadein from '@/app/components/animations/Fadein'
import LightSpeedInLeft from '@/app/components/animations/LightSpeedInLeft'
import Button from '@/app/components/commons/Button'
import FormSuccess from '@/app/components/FormSuccess'
import { clientDirectus } from '@/app/utils/ultils'
import { uploadFiles, createItem, readItems } from '@directus/sdk'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import iconUpload1 from './assets/icon-upload-1.png'
import iconUpload from './assets/icon-upload.png'
import imageStep3 from './assets/step-1.png'
import imageStep2 from './assets/step-2.png'
import imageStep1 from './assets/step-3.png'

interface Category {
  id: string
  title: string
  color: string
  slug: string
}


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
    getValues,
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

  // handler upload file

  const [files, setFiles] = useState<{ preview: string; fileName: string; fileData: File }[]>([])
  const [isUploadFileError, setIsUploadFileError] = useState<boolean>(false)
  const [isErrorSubmitForm, setIsErrorSubmitForm] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  // const [categories, setCategories] = useState<Category[]>([])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list_link_share',
  })

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    accept: {
      'image/*': [],
      // 'video/*': [],
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

  // Fetch categories from Directus
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const result = await clientDirectus.request(
  //         readItems('categories', {
  //           fields: ['id', 'title', 'color', 'slug'],
  //         })
  //       ) as Category[]
  //       setCategories(result)
  //     } catch (error) {
  //       console.error('Failed to fetch categories:', error)
  //     }
  //   }
  //   fetchCategories()
  // }, [])

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
              throw error // Throwing error to be caught by Promise.catch
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
      router
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
                {/* <p className="text-white w-full text-left font-semibold text-xl">
                  Choose the service for quotation
                </p> */}
                {/* <select
                  defaultValue=""
                  className={twMerge(
                    'border-solid border-[1.7px] outline-0 w-full rounded-[12px] px-4 h-[45px] cursor-pointer bg-transparent text-white',
                    errors.service
                      ? 'border-[#FE2E2E] [boxShadow:_0px_0px_10px_0px_rgba(254,46,46,0.5)]'
                      : 'border-white/40 [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)]',
                  )}
                  {...register('service', { required: true })}
                >
                  <option value="" disabled hidden className='text-white'>
                    Select services
                  </option>
                  {categories?.map((category: Category) => (
                    <option key={category.id} value={category.id} className='text-black'>
                      {category.title}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-[#FE2E2E] w-full text-sm  text-left">The field is required.</p>
                )} */}
                <textarea
                  {...register('description')}
                  placeholder="Write your message here along with"
                  className="border-white/40 border-solid border-[1.7px] outline-0 w-full rounded-[12px] p-4 h-[100px] [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)] bg-transparent text-white placeholder:text-white/60"
                />
                <div className="w-full">
                  <div className="container">
                    <div
                      {...getRootProps({
                        className: 'dropzone',
                        onDrop: (event) => event.stopPropagation(),
                      })}
                    >
                      <input {...getInputProps()} />
                      {/* {files?.length > 0 ? (
                        <div className="w-full overflow-y-hidden overflow-x-auto flex flex-row items-center justify-center gap-4 border-white/40 border-solid border-[1.5px] rounded-[12px] p-4 h-[120px] cursor-pointer">
                          {files.map((f, index) => (
                            <div key={index} className="flex h-full w-full relative flex-col gap-1">
                              <Image
                                width={64}
                                height={64}
                                alt="fotober"

                                src={f.preview}
                                className="h-full w-full object-contain relative"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={twMerge(
                            'w-full flex flex-col items-center justify-center gap-4  border-solid border-[1.5px] rounded-[12px] p-4 h-[120px] cursor-pointer',
                            errors.list_link_share && files.length === 0
                              ? 'border-[#FE2E2E] [boxShadow:_0px_0px_10px_0px_rgba(254,46,46,0.5)]'
                              : 'border-white/40 [boxShadow:_5px_5px_10px_0px_rgba(255,255,255,0.2)]',
                          )}
                        >
                          <Image alt="fotober" src={iconUpload} className="w-[35px] h-[25px] invert brightness-200" />
                          <div className="flex flex-row items-center border-white/40 gap-3 rounded-[12px] border-solid border-[1px] p-2">
                            <Image alt="fotober" src={iconUpload1} className="w-[16px] h-[16px] invert brightness-200" />
                            <p className="text-base text-white font-semibold">Upload photo </p>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex flex-row items-center gap-4 mb-3">
                      <input
                        {...register(`list_link_share.${index}.link` as const, {
                          required: files.length === 0,
                        })}
                        placeholder={isFromVideoTrial ? 'Share a video link' : 'Share a link'}
                        className={twMerge(
                          'border-solid border-[1.5px] outline-0 w-full rounded-[12px] px-4 h-[45px] [boxShadow:_5px_5px_5px_0px_#000000a1] bg-transparent text-white placeholder:text-white/60',
                          errors.list_link_share && files.length === 0
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
                  // showArrow
                  wrapClassName="min-w-[150px] btn-bg-primary rounded-[5px]"
                />
                {isErrorSubmitForm && (
                  <p className="text-[#FE2E2E] text-sm mt-2 text-left">
                    An error occurred during the submission process. Please try again or contact us
                    via email at contact@fotober.com.
                  </p>
                )}
                {/* <div className="w-full flex justify-end md:col-span-2 flex-col items-end gap-2">
                  <Turnstile
                    className="w-auto"
                    sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onVerify={(el) => setToken(el)}
                  />
                </div> */}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default SessionContact
