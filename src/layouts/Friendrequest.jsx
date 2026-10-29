import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Profile from '../assets/profile.jpg'
import Image from '../components/Image'
import UserSection from '../components/UserSection';
import TitleSection from '../components/TitleSection';
import Searchbar from '../components/Searchbar';
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const Friendrequest = () => {
   const db = getDatabase();
     const data = useSelector(state => state.activeuser.value)
  let [friendrequrest,setFriendRequest]=useState([])

   useEffect(() => {
      const starCountRef = ref(db, 'friendrequestlists');
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item => {
          
         
            arr.push(item.val())
          
         
        })
        setFriendRequest(arr);
  
  
      });
  
    }, [])
  
  return (
       <div className='h-[320px]  w-full  mt-18'>
            <Searchbar/>
            <div className=' w-full h-full bg-red-100 mt-4 shadow-2xl rounded-xl'>
              <TitleSection title="Friend Request"/>

            <div className='h-[260px] overflow-y-scroll'>
              {
                friendrequrest.map(item=>(
                   <UserSection buttontext="Accept" image={Profile} name={item.sendername} bia="Hi Guys, Wassup!"/>

                ))
              }
               
               
            </div>
            </div>
          </div>
  )
}

export default Friendrequest