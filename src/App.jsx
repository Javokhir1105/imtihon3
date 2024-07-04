import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import './App.css'
import { Popconfirm } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // get api olish
  const [List, setList] = useState([]);

  const getApi = () => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/models')
      .then((res) =>
        res.json()
      )
      .then((item) => setList(item.data))
  };
  useEffect(() => {
    getApi()
  }, [])
  // modal qo'shish
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // post api
  const [name, setname] = useState();
  const [brandid, setbrandid] = useState();

  const tokenlar = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTkyNjQ3NiwiZXhwIjoxNzUxNDYyNDc2fQ.IOdD25deY44m8arP36YzgGRMPwd1b4FfaJLxnnbaS40"

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand_id', brandid);
 

    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/models', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenlar}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {console.log(data);
        if (data.success === true) {
          toast.success(data.message)
          getApi()
          setIsModalOpen(false)
        } else {
          toast.error(data.message)
        }
      });
  };
  // Delete funksiyasi
  const [clickId, setclickId] = useState()
 
  const deleteBTN = (e) => {
    e.preventDefault();

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${clickId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenlar}`,
      },
    })
      .then((akaza) => akaza.json())
      .then((response) => {
        if (response.success === true) {
          toast.success(response.message)
          getApi()
          setIsModalOpen(false)
        } else {
          toast.error(response.message)
        }
      });
  };
  //  PUT
  const [clickAdd, setclickAdd] = useState(false)
  const [nameEdit, setnameEdit] = useState();
  const [brandidEdit, brandidRuEdit] = useState();
 
  const putBTN = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', nameEdit);
    formData.append('brand_id', nameRuEdit);
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${clickId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${tokenlar}`,
      },
    })
    .then((yoichi) => yoichi.json())
    .then((edd) => {
      if (edd.success === true) {
        toast.success(edd.message)
        getApi()
        setIsModalOpen(false)
      } else {
        toast.error(edd.message)
      }
    });
};
  return (
    <>
      <div className="container">
        <Button type="button" onClick={showModal} style={{ backgroundColor: "blue", color: "white" }}>
          qo'shish
        </Button>
      </div>
      <div style={{ marginTop: "50px", marginLeft: "100px" }} >
        <table id="customers" >
          <thead>
            <tr>
              <th>nomi</th>
              <th>Brand nomi</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => (
              <tr onClick={() => { setclickId(item.id) }} key={index}>
                <td>{item.name}</td>
                <td>{item.brand_title}</td>
                <td >
                  <Popconfirm
                    placement="top"
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={deleteBTN}
                  >
                    <Button type='primary' danger >Delete</Button>
                  </Popconfirm></td>
                <td onClick={() => setclickAdd(true) }>
                  <Button type="button" onClick={showModal} style={{ backgroundColor: "blue", color: "white" }}>
                    Tahrirlash
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {
            clickAdd
              ?
              <form style={{ justifyContent: "center" }}>
                <h1>Put to form</h1>
                <input style={{ width: "200px", height: "30px", marginBottom: "40px" }} onChange={(e) => setnameEdit(e.target.value)} type='text' required placeholder='Nameen' />
                <input style={{ width: "200px", height: "30px" }} onChange={(e) => setbrandidEdit(e.target.value)} type='text' required placeholder='Nameru' />
                <button style={{ width: "100px", height: "40px", border: "2px solid red", color: "red" }} onClick={putBTN} type='submit' className="btn">edit</button>
              </form>
              :
              <form style={{ justifyContent: "center" }}>
                <h1>Add to form</h1>
                <input style={{ width: "200px", height: "30px", marginBottom: "40px" }} onChange={(e) => setname(e.target.value)} type='text' required placeholder='Nameen' />
                <input style={{ width: "200px", height: "30px" }} onChange={(e) => setbrandid(e.target.value)} type='text' required placeholder='Nameru' />
                <button style={{ width: "100px", height: "40px", border: "2px solid red", color: "red" }} onClick={handleSubmit} type='submit' className="btn">qo'shish</button>
              </form>
          }
        </Modal>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
