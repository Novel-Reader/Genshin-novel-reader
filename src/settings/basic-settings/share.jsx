import React, { useState } from "react";
import intl from "react-intl-universal";
import { Button, Modal } from "antd";
import { QRCodeSVG } from "qrcode.react";

export default function Share() {

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="basic-settings-item">
      {/* todo: change button to icons in toolbar */}
      <Button type="primary" size="small" onClick={() => setIsOpen(true)}>
        {intl.get('Share')}
      </Button>
      {isOpen && (
        <Modal
          title={intl.get('Scan code to share')}
          open={isOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <QRCodeSVG
              value={window.location.href}
              // todo: react-dom.development.js:86 Warning: React does not recognize the `renderAs` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `renderas` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
              // check docs in QRCode
              // renderAs="svg"
              size={120}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
