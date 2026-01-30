

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__animated', 'animate__fadeIn')
    }
  })
}, { threshold: 0.5 })

export default observer