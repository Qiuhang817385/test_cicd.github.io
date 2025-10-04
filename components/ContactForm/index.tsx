// 2.4 复杂表单与 react-hook-form
// components/ContactForm.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
    alert('提交成功！')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label htmlFor="name">姓名</label>
        <input id="name" {...register('name')} className="input" />       {' '}
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="email">邮箱</label>
        <input id="email" {...register('email')} className="input" />       {' '}
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="message">留言</label>
        <textarea id="message" {...register('message')} className="input" />   
           {' '}
        {errors.message && (
          <span className="text-red-500">{errors.message.message}</span>
        )}
      </div>
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : '提交'}      
      </button>
          
    </form>
  )
}
