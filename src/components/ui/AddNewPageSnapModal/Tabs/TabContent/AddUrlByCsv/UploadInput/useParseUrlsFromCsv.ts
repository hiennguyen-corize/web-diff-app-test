import { uploadUrlList } from '@/components/ui/AddNewPageSnapModal/Tabs/TabContent/AddUrlByCsv';
import { URL_REGEX } from '@/constants/regex';
import { useSetAtom } from 'jotai';
import { compact, first, uniq } from 'lodash';
import { ParseResult, parse } from 'papaparse';
import { useCallback } from 'react';

export const useParseUrlsFromCsv = () => {
  const setParseUrls = useSetAtom(uploadUrlList);

  const handleGetDataFromArray = useCallback(
    (parsedResults: ParseResult<string[]>) => {
      const newParsedData = [...parsedResults.data];
      const urls: string[] = [];

      const getUrls = (newParsedData: string[][]) => {
        if (!newParsedData.length) {
          return;
        }

        const row = newParsedData.shift();
        urls.push(first(row) ?? '');

        if (row) {
          getUrls(newParsedData);
        }
      };

      getUrls(newParsedData);

      const urlList = compact(uniq(urls)).map((url, index) => ({
        approved: true,
        id: index,
        url,
        isAllow: URL_REGEX.test(url),
      }));

      setParseUrls(urlList);
    },
    [setParseUrls]
  );

  const parseFile = useCallback(
    async (file: File): Promise<ParseResult<string[]>> => {
      return new Promise((resolve, reject) => {
        try {
          parse(file, {
            complete: (results: ParseResult<string[]>) => {
              resolve(results);
            },
          });
        } catch (error) {
          reject();
        }
      });
    },
    []
  );

  return { handleGetDataFromArray, parseFile };
};
