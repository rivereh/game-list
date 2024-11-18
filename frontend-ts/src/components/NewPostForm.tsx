import { useState } from 'react'

const NewPostForm = () => {
  const [details, setDetails] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const closeModal = () => {}

  return (
    <div className='rounded bg-white p-4'>
      <form className='' onSubmit={() => console.log()}>
        {/* <label className='form-label' htmlFor='details'>
          Details
        </label> */}
        <textarea
          className='form-input'
          id='details'
          placeholder='Details (optional)'
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <div className='mt-2 flex items-center justify-between'>
          <button className='btn btn-blue'>Add Employee</button>
          <button className='btn btn-red' onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
export default NewPostForm
