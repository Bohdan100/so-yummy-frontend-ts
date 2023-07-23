import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  FC,
} from 'react';

import {
  WrapperImg,
  InputImg,
  PhotoIconStyled,
  ShowImg,
} from './ImgWithPreview.styled';

function previewFile(inputEl: React.RefObject<HTMLImageElement>) {
  const preview = inputEl.current;
  const fileInput = document.querySelector(
    'input[type=file]'
  ) as HTMLInputElement;

  if (!fileInput) {
    return;
  }

  const file = fileInput.files?.[0];
  const reader = new FileReader();

  if (preview) {
    if (!file || (file && file.name.length === 0)) {
      preview.style.opacity = '0';
      preview.src = '';
      return;
    }

    if (
      !file ||
      (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file.type))
    ) {
      preview.style.opacity = '0';
      preview.src = '';
      return;
    }

    reader.onloadend = function () {
      if (reader.result) {
        preview.src = reader.result.toString();
      }
    };

    if (file) {
      preview.style.opacity = '1';
      reader.readAsDataURL(file);
    } else {
      preview.style.opacity = '1';
      preview.src = '';
    }
  }
}

interface IImgWithPreviewProps {
  imgAdd: File | null;
  setImgAdd: Dispatch<SetStateAction<File | null>>;
}

const ImgWithPreview: FC<IImgWithPreviewProps> = ({ imgAdd, setImgAdd }) => {
  const [img, setImg] = useState('');
  const inputEl = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imgAdd) {
      setImg('');
      if (inputEl && inputEl.current) {
        inputEl.current.src = '';
        inputEl.current.style.opacity = '0';
      }
    }
  }, [imgAdd]);

  return (
    <WrapperImg>
      <InputImg
        name="preview"
        type="file"
        onChange={e => {
          previewFile(inputEl);

          if (e.target.files && !e.target.files[0]) {
            setImgAdd(null);
            setImg('');

            return;
          }
          setImgAdd(e.target.files && e.target.files[0]);
          setImg(e.target.value);
        }}
        value={img}
      />

      <PhotoIconStyled width="64" height="64" />

      <ShowImg src="" alt="" ref={inputEl} />
    </WrapperImg>
  );
};

export default ImgWithPreview;
