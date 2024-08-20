import React from 'react';
import cattle from '../../image/cow.png'
import Image from 'next/image';

export default function Table(props) {
  const {key, img, animal, unique, age, weight} = props
  // <Image src={img}  alt='cow' className=' rounded-full  mt-2' />
  return (
  <tr key={key} className=''>
                <td className='flex flex-row items-center'><div className='flex flex-row items-center space-x-1'>
                  <div className='w-9 h-9  rounded-full'>
                    <img src={img} alt='img' className='object-cover rounded-full h-full w-full' />
                  </div>
                  <p className='text-[10px] md:text-xs lg:text-xs font-medium'>{animal}</p></div> </td>
                <td className='uppercase font-medium text-[10px] md:text-xs lg:text-xs items-center whitespace-nowrap text-center'>
                 {unique}
                </td>
                <td className='uppercase font-medium text-[10px] md:text-xs lg:text-xs whitespace-nowrap text-center'>
                   {age}
                </td>
                <td className='uppercase font-medium text-[10px] md:text-xs lg:text-xs whitespace-nowrap text-center'>
                  {weight}
                </td>
                </tr>
                )
}