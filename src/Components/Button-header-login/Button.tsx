import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './buttonHeader.scss'
type TProps = {
    children: JSX.Element
  }
const ButtonHeader: React.FC<TProps> = ({children}: TProps) => {
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <>
      <Button type="ghost" style={{outline: 'unset',width:'7.7rem', height: '4.2rem', padding: 0, borderRadius: '50px'}} onClick={() => setModal1Open(true)}>
        {children}
      </Button>
      <Modal
      maskStyle={{backgroundColor:'unset'}}
        closable={false}
        style={{ top: 70, right: '-29%', padding: 0}}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={null}
      >
        <div className="modal-content-header">
            <a href="#">Đăng ký</a>
            <a href="#">Đăng nhập</a>
        </div>
        <div className="modal-content-footer">
            <a href="#" id='help-btn'>Tro giup</a>
        </div>
      </Modal>
    </>
  );
};

export default ButtonHeader;