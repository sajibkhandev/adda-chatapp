import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Profile from '../assets/profile.jpg'
import Image from '../components/Image'
import UserSection from '../components/UserSection';
import TitleSection from '../components/TitleSection';
import Searchbar from '../components/Searchbar';
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const Friendlist = () => {
  const db = getDatabase();
  const [friend, setFriend] = useState([])
   const data = useSelector(state => state.activeuser.value)


  useEffect(() => {
    const starCountRef = ref(db, 'friends/');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (item.val().receiverid == data.uid || item.val().senderid == data.uid) {
          arr.push({ ...item.val(), id: item.key })
        }

      })
      setFriend(arr);


    });

  }, [])






  return (
    <div className='h-[320px]  w-full  mt-8'>
      <Searchbar />
      <div className=' w-full h-full bg-red-100 mt-4 shadow-2xl rounded-xl'>
        <TitleSection title="Friends" />

        <div className='h-[260px] overflow-y-scroll'>
          {
            friend.map(item => (
             

              <UserSection image={data.uid==item.senderid? item.receiverprofile :item.senderprofile} name={data.uid==item.senderid? item.receivername :item.sendername} bia="Hi Guys, Wassup!" buttontext="block"/>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Friendlist