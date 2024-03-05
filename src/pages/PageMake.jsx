import React, { useContext, useState, useRef, useEffect } from "react";
import Select from 'react-select';
import { useReactToPrint } from 'react-to-print';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";

// ContextMain
import { useSite } from '../context/ContextMain';

// PrintPage
import { SinglePrintComp, MultiPrintComp } from '../components/PrintComp';


const PageMake = () => {

    const printPageRef = useRef();

    const [selectedPersonals, setSelectedPersonals] = useState([]);

    const [preview, setPreview] = useState(null);

    const { personals, setPersonals } = useSite();

    const [makeType, setMakeType] = useState(null);

    useEffect(() => {
        setPreview(null);
    }, [makeType])


    const makeTypeHandle = e => {
        setMakeType(e.currentTarget.value);
    }

    const eventPrintPage = useReactToPrint({
        content: () => printPageRef.current,
    });

    const addZeroNumber = number => {
        return number < 10 ? '0' + number : number;
    }

    String.prototype.ucwords = function (text) {
        let str = text.toLowerCase();
        return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
            function (s) {
                return s.toLocaleUpperCase('tr-TR');
            });
    };

    const eventFormSubmit = e => {
        e.preventDefault();
        const date = new Date(e.target.date.value);
        const date2 = new Date(e.target.tebligDate.value);
        setPreview({
            byCreated: String.prototype.ucwords(e.target.byCreated.value),
            date: addZeroNumber(date.getDate()) + '/' + addZeroNumber((date.getMonth() + 1)) + '/' + date.getFullYear(),
            tebligDate: addZeroNumber(date2.getDate()) + '/' + addZeroNumber((date2.getMonth() + 1)) + '/' + date2.getFullYear(),
            ebysNo: e.target.ebysNo.value,
            subject: String.prototype.ucwords(e.target.subject.value),
            signature: e.target.makeType.value === 'multi' ? personals.filter(person => String(person.idNo) === e.target.signature.value)[0] : null,
            makeType: e.target.makeType.value,
            tebellugEdenler: selectedPersonals.map(item => personals.filter(person => person.idNo === item.code)[0]),
            tebellugEden: e.target.makeType.value === 'single' ? personals.filter(person => String(person.idNo) === e.target.tebellugEden.value)[0] : null,
            tebligEden: e.target.makeType.value === 'single' ? personals.filter(person => String(person.idNo) === e.target.tebligEden.value)[0] : null,
        });
    }

    return (
        <>
            <form className="mb-6" onSubmit={eventFormSubmit}>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="byCreated" className="block text-sm font-medium leading-6 text-gray-900">
                            İlgi Evrakı Üreten Birim
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                type="text"
                                name="byCreated"
                                id="byCreated"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                            İlgi Evrakın Tarihi
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                type="date"
                                name="date"
                                id="date"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ebysNo" className="block text-sm font-medium leading-6 text-gray-900">
                            İlgi Evrakın Sayısı
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm font-semibold">EBYS - </span>
                                <input
                                    required
                                    type="text"
                                    name="ebysNo"
                                    id="ebysNo"
                                    className="block flex-1 border-0 bg-transparent p-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    style={{ outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                            İlgi Evrakı Konusu
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                type="text"
                                name="subject"
                                id="subject"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="tebligDate" className="block text-sm font-medium leading-6 text-gray-900">
                            Tebliğ Tarihi
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                type="date"
                                name="tebligDate"
                                id="tebligDate"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-6">
                    <label htmlFor="multi" className="flex items-center gap-3 rounded-md cursor-pointer block text-sm font-bold leading-6 text-gray-700 bg-gray-200 p-4 hover:bg-gray-300 transition-colors">
                        <input
                            id="multi"
                            name="makeType"
                            required
                            type="radio"
                            value={'multi'}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 inline-block"
                            checked={makeType === 'multi' ? true : false}
                            onChange={makeTypeHandle}
                        />
                        <span>ÇOKLU TEBLİĞ</span>
                    </label>
                    <label htmlFor="single" className="flex items-center gap-3 rounded-md cursor-pointer block text-sm font-bold leading-6 text-gray-700 bg-gray-200 p-4 hover:bg-gray-300 transition-colors">
                        <input
                            id="single"
                            name="makeType"
                            required
                            type="radio"
                            value={'single'}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            checked={makeType === 'single' ? true : false}
                            onChange={makeTypeHandle}
                        />
                        <span>KİŞİYE ÖZEL TEBLİĞ</span>
                    </label>

                </div>
                {makeType === 'multi' && (
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="signature" className="block text-sm font-medium leading-6 text-gray-900">
                                Evrakı İmzalayacak Personel
                            </label>
                            <div className="mt-2 w-full">
                                <Select required className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" name="signature" id="signature" options={personals.map((person) => { return { value: person.idNo, label: person.rank + ' - ' + person.nameSurname } })} />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="signature" className="block text-sm font-medium leading-6 text-gray-900">
                                Tebellüğ Eden Personeller
                            </label>
                            <div className="mt-2 w-full">
                                <MultiSelect
                                    value={selectedPersonals}
                                    onChange={(e) => setSelectedPersonals(e.value)}
                                    options={personals.map(person => { return { code: person.idNo, name: person.rank + ' - ' + person.nameSurname } })}
                                    optionLabel="name"
                                    placeholder="Personelleri Seçin..."
                                    maxSelectedLabels={3}
                                    filter
                                    className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" />
                            </div>
                        </div>
                    </div>

                )}
                {makeType === 'single' && (
                    <div className="flex justify-between gap-5">
                        <div className="w-[50%]">
                            <label htmlFor="tebligEden" className="block text-sm font-medium leading-6 text-gray-900">
                                Tebliğ Eden Personel
                            </label>
                            <div className="mt-2 w-full">
                                <Select name="tebligEden" placeholder="Personeli Seçin..." className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" options={personals.map((person) => { return { value: person.idNo, label: person.rank + ' - ' + person.nameSurname } })} />
                            </div>
                        </div>
                        <div className="w-[50%]">
                            <label htmlFor="tebellugEden" className="block text-sm font-medium leading-6 text-gray-900">
                                Tebellüğ Eden Personel
                            </label>
                            <div className="mt-2 w-full">
                                <Select name="tebellugEden" placeholder="Personeli Seçin..." className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" options={personals.map((person) => { return { value: person.idNo, label: person.rank + ' - ' + person.nameSurname } })} />
                            </div>
                        </div>
                    </div>
                )}
                {makeType !== null && (
                    <div className="flex gap-3 justify-end mt-6">
                        <button
                            type="submit"
                            className="rounded-md text-slate-700 py-2 px-3 text-sm  font-semibold shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
                        >
                            Önizleme
                        </button>
                        {preview !== null && (
                            <button
                                type="button"
                                onClick={eventPrintPage}
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Yazdır
                            </button>
                        )}

                    </div>
                )}

            </form>
            {preview !== null && (
                <div className="preview shadow-xl rounded-lg border-2 mx-auto p-5" style={{ width: 'max-content' }}>
                    <div ref={printPageRef} className="w-[210mm] h-[297mm] p-5 text-[0.9em]">
                        {preview.makeType === 'single' ? <SinglePrintComp preview={preview} /> : <MultiPrintComp preview={preview} />}
                    </div>
                </div>
            )
            }
        </>
    )
}

export default PageMake;