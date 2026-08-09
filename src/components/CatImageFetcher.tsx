'use client';

import { ReactElement, useEffect, useState } from 'react';
import { RandomCat } from '../lib/Types.js';
import { CatImage } from './CatImage';

export const CatImageFetcher = (): ReactElement => {
  const [catImage, setCatImage] = useState<null | RandomCat>(null);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search').then(async (res: Response) => {
      const json: Array<RandomCat> = await res.json() as Array<RandomCat>;

      setCatImage(json[0]!);
    });
  }, []);

  return (
    <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
      <CatImage cat={catImage} />
    </div>
  );
};
