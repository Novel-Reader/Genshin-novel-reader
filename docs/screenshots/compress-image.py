'''
pip install numpy
pip install opencv-python
'''
from io import BytesIO
import cv2
import numpy as np


def pic_compress(pic_path, out_path, target_size=199, quality=90, step=5, pic_type='.png'):
    with open(pic_path, 'rb') as f:
        pic_byte = f.read()

    img_np = np.frombuffer(pic_byte, np.uint8)
    img_cv = cv2.imdecode(img_np, cv2.IMREAD_ANYCOLOR)

    current_size = len(pic_byte) / 1024
    print("old image size is ", current_size, ' kb')
    while current_size > target_size:
        pic_byte = cv2.imencode(pic_type, img_cv, [int(cv2.IMWRITE_JPEG_QUALITY), quality])[1]
        if quality - step < 0:
            break
        quality -= step
        current_size = len(pic_byte) / 1024

    with open(out_path, 'wb') as f:
        f.write(BytesIO(pic_byte).getvalue())

    return len(pic_byte) / 1024


def main():
    pic_size = pic_compress('test.png', 'new_test.png', target_size=100)
    print("new image size is ：", pic_size, ' kb')

if __name__ == '__main__':
    main()
