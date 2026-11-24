import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Profile from '../assets/profile.jpg'
import Image from '../components/Image'
import UserSection from '../components/UserSection';
import TitleSection from '../components/TitleSection';
import Searchbar from '../components/Searchbar';
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react"
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";


const Mygrouplist = () => {
   const db = getDatabase();
  let [popup,setPopup]=useState(false)
  let [popup2,setPopup2]=useState(false)
   const [alluser, setAllUser] = useState([])

  let [input,setInput]=useState("")
  let [allgroup,setAllGroup]=useState([])
    const data = useSelector(state => state.activeuser.value)

  let handleCreateGroup=()=>{
    console.log(input);
       set(push(ref(db, 'groups/')), {
        groupname:input,
        groupcreator:data.displayName
    }).then(()=>{
      setPopup(false)
    });
  }


    useEffect(() => {
        const starCountRef = ref(db, 'groups');
        onValue(starCountRef, (snapshot) => {
          let arr = []
          snapshot.forEach(item => {
            arr.push(item.val())
          })
          setAllGroup(arr);
    
    
        });
    
      }, [])


      
  useEffect(() => {
    const starCountRef = ref(db, 'allusers');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
          arr.push(item.val())
       
      })
      setAllUser(arr);


    });

  }, [])

     


  return (
    <div className='h-[320px]  w-full  mt-18'>
      <Searchbar />
      <div className=' w-full h-full bg-red-100 mt-4 shadow-2xl rounded-xl'>
        <TitleSection onclick={()=>setPopup(true)} title="My Groups" />

        {
          popup && 
        <div className="absolute top-0 left-0 z-40 bg-black/40 w-full h-screen flex justify-center items-center">
          <div className="relative w-[500px] px-20 h-[300px] bg-white rounded-md flex flex-col justify-center items-center gap-y-4">
            <RxCross2 onClick={()=>setPopup(false)} className="absolute top-10 right-10"/>

            <h3 className="text-3xl ">Create Group</h3>
            <div className='w-full rounded-xl'>
              <input onChange={(e)=>setInput(e.target.value)} className='border border-black py-3 pl-5 pr-10 shadow-2xl  w-full' type="text" placeholder='Search' />
            </div>
            <button onClick={handleCreateGroup} className='bg-[#5F35F5] py-1 px-3 text-white font-bold rounded-md ml-3'>Create</button>
          </div>
        </div>
        }


        <div className='h-[260px] overflow-y-scroll'>

          {
            allgroup.map(item=>(
              <UserSection onClickForAdd={()=>setPopup2(true)} image={Profile} name={item.groupname} buttontext="add member" bia="Hi Guys, Wassup!" />

            ))
          }

          {
            popup2 &&  <div className="absolute top-0 left-0 z-40 bg-black/40 w-full h-screen flex justify-center items-center">
          <div className="relative w-[500px] px-20 py-10 bg-white rounded-md flex flex-col justify-center items-center gap-y-4">
            <RxCross2 onClick={()=>setPopup2(false)} className="absolute top-10 right-10"/>

            <h3 className="text-3xl ">Add Member</h3>
            {
              alluser.map(item=>(
                <ul className="border border-black py-1 px-7">
                  <li>{item.name} <button  className='bg-[#5F35F5] py-1 px-3 text-white font-bold rounded-md ml-3'>add</button></li>
                </ul>
              ))
            }
           
           
          </div>
        </div>
          }

          
      

        </div>
      </div>
    </div>
  )
}

export default Mygrouplist