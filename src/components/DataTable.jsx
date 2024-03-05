import React, { useState, useEffect, useRef, useContext } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import Modal from './Modal';

// ContextMain
import { useSite } from '../context/ContextMain';

const DataTable = () => {

    const {personals, setPersonals} = useSite();

    const inputSearchRef = useRef(null);

    const [personalList, setPersonalList] = useState(personals);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        setPersonalList(personals);
    }, [personals])

    const eventFilter = e => {
        const word = e.target.value.toLocaleLowerCase('tr-TR');
        const filteredList = personals.filter(item =>
            item.nameSurname.toLocaleLowerCase('tr-TR').includes(word) ||
            String(item.idNo).toLocaleLowerCase('tr-TR').includes(word) ||
            item.rank.toLocaleLowerCase('tr-TR').includes(word)
        );
        word === '' ? setPersonalList(personals) : setPersonalList(filteredList)
    }

    const eventDelete = idNo => {
        const person = personals.filter(person => person.idNo === idNo)[0];
        if (confirm(idNo + ' sicil sayılı ' + person.rank + ' ' + person.nameSurname + '\nisimli personeli silmek istediğinize emin misiniz?')) {
            setPersonals(personals.filter(person => person.idNo !== idNo));
            toast.success(person.nameSurname + '\n isimli personel kaydı silindi.');
            inputSearchRef.current.value='';
        }
    }

    const eventEdit = idNo => {
        setSelectedPerson(personals.filter(person => person.idNo === idNo)[0]);
    }

    return (
        <>
            {selectedPerson !== null && <Modal selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} />}
            <div className='flex justify-center mb-5'>
                <input type="text" ref={inputSearchRef} placeholder='İsim, Soyisim, Sicil veya Rütbe ile arama yapabilirsiniz' onChange={eventFilter} className='w-[25rem] block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
            </div>
            <ul role="list" className="divide-y divide-gray-100 border rounded-md">
                {personalList.map((item) => (
                    <li key={item.idNo} className="flex gap-x-6 px-3 py-2 items-center hover:hover:bg-gray-100 transition-colors">
                        <div className='w-[4rem]'>{item.idNo}</div>
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-0 text-gray-900">{item.nameSurname}</p>
                                <p className="text-xs leading-0 text-gray-500">{item.rank}</p>
                            </div>
                        </div>
                        <div className="items-end ms-auto flex gap-x-2">
                            <button onClick={() => eventEdit(item.idNo)} className='hover:bg-white p-2 rounded-full border'>
                                <PencilIcon className='h-4 w-4' />
                            </button>
                            <button onClick={() => eventDelete(item.idNo)} className='hover:bg-red-600 hover:text-white transition-colors p-2 rounded-full border'>
                                <TrashIcon className='h-4 w-4' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DataTable