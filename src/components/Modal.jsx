import React, { useContext } from "react";
import { toast } from 'react-toastify';

// ContextMain
import { useSite } from '../context/ContextMain';

export default function Modal({ selectedPerson, setSelectedPerson }) {

    const {personals, setPersonals} = useSite();

    const ranks = [
        '1. Sınıf Emniyet Müdürü',
        '2. Sınıf Emniyet Müdürü',
        '3. Sınıf Emniyet Müdürü',
        '4. Sınıf Emniyet Müdürü',
        'Emniyet Amiri',
        'Başkomiser',
        'Komiser',
        'Komiser Yardımcısı',
        'Kıdemli Başpolis',
        'Başpolis',
        'Polis Memuru',
        'Kadın Pol.Me.',
        'Ç.M.B',
        'Teknisyen Yrd.',
        'Bilgisayar İşletmeni'
    ];

    const submitHandle = e => {
        e.preventDefault();
        setPersonals(personals.map(person => String(person.idNo) === e.target.idNo.value ? { ...person, nameSurname: e.target.nameSurname.value.toLocaleUpperCase('tr-TR'), rank: e.target.rank.value } : person));
        toast.success(selectedPerson.nameSurname + '\n isimli personel kaydı güncellendi.');
        setSelectedPerson(null);
    }

    return (
        <>
            <form onSubmit={submitHandle}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-3xl my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex flex-row items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-gray-100">
                                <h4 className="text-2xl font-semibold">
                                    <small className="block text-gray-400 font-semibold text-sm">{selectedPerson.nameSurname}</small>
                                    Personal Kaydı Düzenle
                                </h4>

                            </div>
                            <div className="relative p-6 flex-auto">
                                <div className="columns-3">
                                    <div>
                                        <label htmlFor="idNo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Sicil Numarası
                                        </label>
                                        <input
                                            type="text"
                                            name="idNo"
                                            id="idNo"
                                            defaultValue={selectedPerson.idNo}
                                            autoComplete="off"
                                            readOnly
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="nameSurname" className="block text-sm font-medium leading-6 text-gray-900">
                                            İsim Soyisim
                                        </label>
                                        <input
                                            type="text"
                                            name="nameSurname"
                                            id="nameSurname"
                                            defaultValue={selectedPerson.nameSurname}
                                            autoComplete="off"
                                            required
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="rank" className="block text-sm font-medium leading-6 text-gray-900">
                                            Rütbe
                                        </label>
                                        <select
                                            id="country"
                                            name="rank"
                                            defaultValue={selectedPerson.rank}
                                            autoComplete="off"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {ranks.map((rank, index) => <option key={index} defaultValue={rank}>{rank}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-gray-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setSelectedPerson(null)}
                                >
                                    Kapat
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
            </form>
        </>
    );
}