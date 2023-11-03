import React, { useState } from "react";
// import intl from "react-intl-universal";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { QRCodeSVG } from "qrcode.react";

export default function Share() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="basic-settings-item">
      {/* todo: change button to icons in toolbar */}
      <Button onClick={() => setIsOpen(true)} size="sm" color="primary">
        分享
      </Button>
      {isOpen && (
        <Modal
          isOpen={true}
          toggle={() => setIsOpen(false)}
          className="scan-dialog"
        >
          <ModalHeader toggle={() => setIsOpen(false)}>扫码分享</ModalHeader>
          <ModalBody style={{ display: "flex", justifyContent: "center" }}>
            <QRCodeSVG
              value={window.location.href}
              renderAs="svg"
              size={120}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>关闭</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
