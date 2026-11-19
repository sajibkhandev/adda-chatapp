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


const Blockuserlist = () => {
    const db = getDatabase();
  const [blockuser, setBlockuser] = useState([])
  const data = useSelector(state => state.activeuser.value)

    useEffect(() => {
      const starCountRef = ref(db, 'blocklists/');
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item => {
          if(data.uid==item.val().blockbyid || data.uid==item.val().blockid ){
            arr.push({ ...item.val(), id: item.key })
          }
          
  
        })
        setBlockuser(arr);
  
  
      });
  
    }, [])
  return (
      <div className='h-[320px]  w-full  mt-18'>
            <Searchbar/>
            <div className=' w-full h-full bg-red-100 mt-4 shadow-2xl rounded-xl'>
              <TitleSection title="Blocked Users"/>

            <div className='h-[260px] overflow-y-scroll'>
              {
                blockuser.map(item=>(
                  <UserSection image={data.uid==item.blockbyid ? item.blockprofile :item.blockbyprofile} name={data.uid==item.blockbyid ? item.blockname :item.blockbyname} bia="Hi Guys, Wassup!" buttontext={data.uid==item.blockbyid ? "unblock":"you can block"}/>
                ))
              }
               
               
            </div>
            </div>
          </div>
  )
}

export default Blockuserlist