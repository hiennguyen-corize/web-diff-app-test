import { first } from 'lodash';
import { useCallback } from 'react';
import {
  CSVInputWrapper,
  CSVLabel,
  UploadCSVIcon,
  UploadCSVText,
} from './styles';
import { useParseUrlsFromCsv } from './useParseUrlsFromCsv';

const acceptTypes = [
  //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];

export const UploadInput = () => {
  const { handleGetDataFromArray, parseFile } = useParseUrlsFromCsv();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = first(event.target.files);

    if (!file || acceptTypes.every((type) => type !== file.type)) {
      return;
    }

    const parsedResults = await parseFile(file);
    handleGetDataFromArray(parsedResults);
  };

  const handleDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault();

      const file = first(event.dataTransfer?.files);

      if (!file || acceptTypes.every((type) => type !== file.type)) {
        return;
      }

      const parsedResults = await parseFile(file);

      handleGetDataFromArray(parsedResults);
    },
    [handleGetDataFromArray, parseFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <CSVInputWrapper onDrop={handleDrop} onDragOver={handleDragOver}>
      <CSVLabel htmlFor='dropzone-file'>
        <UploadCSVIcon
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 16'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
          />
        </UploadCSVIcon>
        <UploadCSVText>
          <span>Click to upload</span> or drag and drop
        </UploadCSVText>
        <input
          onChange={handleChange}
          id='dropzone-file'
          accept='.csv'
          type='file'
        />
      </CSVLabel>
    </CSVInputWrapper>
  );
};
