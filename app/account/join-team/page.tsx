"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {
    const [inviteLink,setInviteLink] = useState("");
    const handelSubmit =  () =>{
        
    }
  return (
    <>
    <div className="fixed flex justify-center items-center z-50 w-full h-full bg-gray-900 bg-opacity-50" >
      <div className="bg-white p-6 rounded-md w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-10" >
        <h2 className="text-xl font-semibold mb-6">الفريق</h2>
        
        <div className="mb-4">
          <label htmlFor="inviteLink" className="block text-sm font-medium text-violet-600"> رابط الدعوة </label>
          <input onChange={(e)=>setInviteLink(e.target.value)}
            id="inviteLink"
            type="text"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent"
            placeholder="أدخل رابط الدعوة"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Link  href={"/account"}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded-md"
          >
            إلغاء
          </Link>
          <button onClick={handelSubmit}
            className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-md shadow-md"
          >
            حسناً
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Page
