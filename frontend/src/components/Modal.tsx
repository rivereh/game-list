import { useState } from 'react'

const Modal = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25'>
        <div className='w-[400px] rounded bg-white p-2'>
          <form className='rounded px-8 py-6' onSubmit={handleFormSubmit}>
            <label className='form-label' htmlFor='firstname'>
              First Name
            </label>
            <input
              className='form-input'
              id='firstname'
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className='form-label' htmlFor='lastname'>
              Last Name
            </label>
            <input
              className='form-input'
              id='lastname'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
            />

            <label className='form-label' htmlFor='email'>
              Email
            </label>
            <input
              className='form-input'
              id='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className='mt-2 flex items-center justify-between'>
              <button className='btn btn-blue'>Add Employee</button>
              <button className='btn btn-red'>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Modal
