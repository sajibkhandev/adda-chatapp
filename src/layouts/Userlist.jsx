import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from '../components/Image'
import UserSection from '../components/UserSection';
import TitleSection from '../components/TitleSection';
import Searchbar from '../components/Searchbar';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Userlist = () => {
  const db = getDatabase();
  const [alluser, setAllUser] = useState([])
  const data = useSelector(state => state.activeuser.value)
 
  let [concatfriendrequrest,setConcateFriendRequest]=useState([])
  let [concatfriend,setConcateFriend]=useState([])
  let [concatblocklist,setConcatBlockList]=useState([])
 
  

  




  useEffect(() => {
    const starCountRef = ref(db, 'allusers');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (data.uid != item.val().userid) {
          arr.push(item.val())
        }
      })
      setAllUser(arr);


    });

  }, [])

  const handleAdd = (item) => {
    
    
    set(push(ref(db, 'friendrequestlists/')), {
      senderid:data.uid,
      sendername:data.displayName,
      senderprofile:data.photoURL,
      receiverid:item.userid,
      receivername:item.name,
      receiverprofile:item.profile
    });

  }

  useEffect(() => {
      const starCountRef = ref(db, 'friendrequestlists');
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item => {
            arr.push(item.val().receiverid + item.val().senderid)
            
          
         
        })
        setConcateFriendRequest(arr);
  
  
      });
  
    }, [])



    
  useEffect(() => {
    const starCountRef = ref(db, 'friends/');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        
          arr.push(item.val().receiverid + item.val().senderid)
        

      })
      setConcateFriend(arr);


    });

  }, [])


   useEffect(() => {
      const starCountRef = ref(db, 'blocklists/');
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item => {

          arr.push(item.val().blockid + item.val().blockbyid)
        })
        setConcatBlockList(arr);
  
  
      });
  
    }, [])


 
    



    




  return (
    <div className='h-[320px]  w-full  mt-8'>
      <Searchbar />
      <div className=' w-full h-full bg-red-100 mt-4 shadow-2xl rounded-xl'>
        <TitleSection title="User List" />

        <div className='h-[260px] overflow-y-scroll'>
          {
            alluser.map(item => (


              concatblocklist.includes(item.userid+data.uid)||
              concatblocklist.includes(data.uid+item.userid)
              ?
               <UserSection  buttontext="block" image={item.profile} name={item.name} bia={item.email} />
              :

               concatfriend.includes(item.userid+data.uid)||
                concatfriend.includes(data.uid+item.userid)
                ?
                 <UserSection  buttontext="friend" image={item.profile} name={item.name} bia={item.email} />
                 :

                concatfriendrequrest.includes(item.userid+data.uid)||
                concatfriendrequrest.includes(data.uid+item.userid)
                ?
               
                <UserSection  buttontext="padding" image={item.profile} name={item.name} bia={item.email} />
                
                :
                <UserSection onClickForAdd={()=>handleAdd(item)}  buttontext="add" image={item.profile} name={item.name} bia={item.email} />

              

            ))
          }


        </div>
      </div>
    </div>
  )
}

export default Userlist






