import React from 'react'

const SingleTebligComp = ({ preview }) => {
    return (
        <div className='flex flex-col gap-12'>
            <h2 className='font-semibold text-center text-lg'>TEBLİĞ VE TEBELLÜĞ BELGESİ</h2>
            <p className='text-justify indent-10 leading-5'>{preview.byCreated} {preview.date} tarih ve EBYS-{preview.ebysNo} sayılı "{preview.subject}" konulu yazısı {preview.tebellugEden.idNo} sicil sayılı {preview.tebellugEden.rank} {preview.tebellugEden.nameSurname} isimli personele okutularak imza karşılığı tebliğ edilmiştir.</p>
            <div className="flex flex-col text-center border rounded-md">
                <div className="flex font-semibold border-b">
                    <div className="flex-1 border-r p-1">TEBLİĞ EDEN</div>
                    <div className="flex-1 border-r p-1">TEBLİĞ TARİHİ</div>
                    <div className="flex-1 p-1">TEBELLÜĞ EDEN</div>
                </div>
                <div className="flex h-32 leading-4">
                    <div className="flex-1 flex items-end justify-center border-r pb-5">
                        <div>
                            <div>{preview.tebligEden.nameSurname}</div>
                            <div>{preview.tebligEden.rank}</div>
                            <div>{preview.tebligEden.idNo}</div>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center border-r">
                        <div>{preview.tebligDate}</div>
                    </div>
                    <div className="flex-1 flex items-end justify-center pb-5">
                        <div>
                            <div>{preview.tebellugEden.nameSurname}</div>
                            <div>{preview.tebellugEden.rank}</div>
                            <div>{preview.tebellugEden.idNo}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SinglePrintComp = ({ preview }) => {

    const itemClass = 'flex-1';

    return (
        <div className='flex flex-col h-[100%]'>
            <div className={`${itemClass} border-b border-dashed border-gray-300`}><SingleTebligComp preview={preview} /></div>
            <div className={`${itemClass} pt-10`}><SingleTebligComp preview={preview} /></div>
        </div>
    )
}

// -----------------------------------------------------------------------------------------------------------

const MultiTebligComp = ({ preview }) => {
    const limit = 35;
    const tebellugEdenler = preview.tebellugEdenler;
    const count = preview.tebellugEdenler.length;
    const multiColum = count > limit ? Math.ceil(count/2) : false;

    const borderColor = ' border-gray-500';

    const tableContainerClass = 'flex flex-1 items-stretch w-full max-h-10 border-b ' + borderColor+ (!multiColum ? ' text-[0.8em]' : ' text-[0.7em]');
    const tableColumnClass = 'text-center flex justify-center items-center border-l' + borderColor;
    const tableColumnStyle = [{ maxWidth: '50px', width:'6%' }, { maxWidth: '75px', width:'13%' }, { maxWidth: '120px', width:'21%' }, { width: '40%', paddingInline: '3px', textWrap:'nowrap', justifyContent:'flex-start' }, { width:'20%', maxWidth: '20%', minWidth:'50px', marginLeft: 'auto' }];
    const table = {
        head: (
            <div className={`${tableContainerClass} font-semibold border-t max-h-7 bg-gray-100`}>
                <div className={`${tableColumnClass} py-1`} style={tableColumnStyle[0]}>S.N</div>
                <div className={`${tableColumnClass} py-1`} style={tableColumnStyle[1]}>SİCİL</div>
                <div className={`${tableColumnClass} py-1`} style={tableColumnStyle[2]}>RÜTBE</div>
                <div className={`${tableColumnClass} py-1`} style={tableColumnStyle[3]}>İSİM SOYİSİM</div>
                <div className={`${tableColumnClass} py-1 border-r`} style={tableColumnStyle[4]}>İMZA</div>
            </div>
        ),
        row: (person, index) => (
            <div className={`${tableContainerClass}`} key={index}>
                <div className={`${tableColumnClass} font-semibold`} style={tableColumnStyle[0]}>{index + 1}</div>
                <div className={`${tableColumnClass}`} style={tableColumnStyle[1]}>{person.idNo}</div>
                <div className={`${tableColumnClass}`} style={tableColumnStyle[2]}>{person.rank}</div>
                <div className={`${tableColumnClass}`} style={tableColumnStyle[3]}>{person.nameSurname}</div>
                <div className={`${tableColumnClass} border-r`} style={tableColumnStyle[4]}></div>
            </div>
        )
    };
    return (
        <div className='flex flex-col gap-12 h-full'>
            <h2 className='font-semibold text-center text-lg'>TEBLİĞ VE TEBELLÜĞ BELGESİ</h2>
            <p className='text-justify indent-10 leading-5'>{preview.byCreated} {preview.date} tarih ve EBYS-{preview.ebysNo} sayılı "{preview.subject}" konulu yazısı aşağıda isim ve sicil bilgileri olan personele okutularak imza karşılığı tebliğ edilmiştir. {preview.tebligDate}</p>
            <div className='flex justify-end px-10'>
                <div className='text-center leading-4'>
                    <div>{preview.signature.nameSurname}</div>
                    <div>Polis Merkezi Amiri</div>
                    <div>{preview.signature.rank}</div>
                </div>
            </div>
            {multiColum && (
                <div className={'h-full flex flex-row'}>
                    <div className='flex-1 h-full flex flex-col'>
                        {table.head}
                        {tebellugEdenler.map((person, index) => (index+1)<=multiColum && table.row(person, index))}
                    </div>
                    <div className='flex-1 h-full flex flex-col'>
                        {table.head}
                        {tebellugEdenler.map((person, index) => (index+1)>multiColum && table.row(person, index))}
                    </div>
                </div>
            )}
            {!multiColum && ( // Single Column
                <div className={'h-full flex flex-col'}>
                    {table.head}
                    {tebellugEdenler.map((person, index) => table.row(person, index))}
                </div>
            )}
        </div>
    )
}

const MultiPrintComp = ({ preview }) => {
    return (
        <MultiTebligComp preview={preview} />
    )
}

export { SinglePrintComp, MultiPrintComp };