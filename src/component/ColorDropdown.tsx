import { Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import "../index.css"

export interface IColor {
    color: string;
    name: string;
    displayName: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export interface IColorDropdown {
    options: IColor[];
    value: IColor;
    onChange: (selected: IColor | undefined) => void;
}

function ColorDropdown({ options, value, onChange }: IColorDropdown) {
    const [currentName, setCurrentName] = useState<string>(value?.name)

    const selectedObj: IColor | undefined = useMemo(() => {
        return options.find((e: IColor) => e.name == currentName)
    }, [currentName])

    useEffect(() => {
        onChange(selectedObj)
    }, [selectedObj])

    return <>

        <Listbox value={currentName} onChange={(e: string) => {
            setCurrentName(e)
        }}>
            {({ open }) => (
                <>
                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                <span className='w-2 h-2 rounded-full' style={{ backgroundColor: selectedObj?.color }}></span>
                                <span className="ml-3 block truncate">{selectedObj?.displayName}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((color) => (
                                    <Listbox.Option

                                        key={color.color}
                                        className={({ active }) => {
                                            return classNames(
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }}
                                        value={color.name}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span className='w-2 h-2 rounded-full' style={{ backgroundColor: color.color }}></span>

                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {color.displayName}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    </>
}

export { ColorDropdown }