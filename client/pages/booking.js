import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createReserve } from "../redux/actions/reserves";

export default function booking() {
    const router = useRouter();
    const dispatch = useDispatch();
   
    const coworkSpace = useSelector((state) => state.coworkSpaces.coworkSpace);
  
    useEffect(() => {
        if (coworkSpace) {
            const { name, price } = coworkSpace;
            setCoworkSpace(`${name} - ${price}`);
        }
    }, [coworkSpace]);

   
    const [date_from, setDateFrom] = useState("");
    const [date_to, setDateTo] = useState("");
    const [occupants, setOccupants] = useState("");
    const [cowork_space, setCoworkSpace] = useState("");
    
    const [dateFromError, setDateFromError] = useState(false);
    const [dateToError, setDateToError] = useState(false);
    const [occupantsError, setOccupantsError] = useState(false);
    const [coworkSpaceError, setCoworkSpaceError] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showCheckboxError, setShowCheckboxError] = useState(false);

   

    const handleDateFromChange = (e) => {
        setDateFrom(e.target.value);
        setDateFromError(false);
    };

    const handleDateToChange = (e) => {
        setDateTo(e.target.value);
        setDateToError(false);
    };

    const handleOccupantsChange = (e) => {
        const value = e.target.value;
        const isValid = value >= 1 && value <= 20;

        setOccupants(value);
        setOccupantsError(!isValid);
    };

    const handleCoworkSpaceChange = (e) => {
        setCoworkSpace(e.target.value);
        setCoworkSpaceError(false);
    };

    const handleCheckBox = (e) => {
        setIsChecked(e.target.value);
        setShowCheckboxError(false);
    };


    

    const handleReserveClick = () => {
        if (
            date_from === "" ||
            date_to === "" ||
            occupants === "" ||
            cowork_space === "" ||
            isChecked === ""
        ) {
           
            alert("Por favor complete todos los campos.");
            return;
        }
    

        dispatch(createReserve({
            
            date_from: date_from,
            date_to: date_to,
            occupants: occupants,
            cowork_space: cowork_space,
        }));

        alert("Reserva confirmada");
    };

   

    const handleSubmit = (e) => {
        e.preventDefault();

        
        
        if (date_from === "") {
            setDateFromError(true);
        }
        if (date_to === "") {
            setDateToError(true);
        }
        if (occupants === "") {
            setOccupantsError(true);
        }
        if (cowork_space === "") {
            setCoworkSpaceError(true);
        }
        

        if (  !dateFromError && !dateToError && !occupantsError && !coworkSpaceError ) {
            handleReserveClick();
        } 
    };

    return (
        <>
            <Navbar />

            <div className="container mx-auto px-4 ">
                <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-2xl">
                    <h2 className="text-4xl font-bold mb-6 text-center dark:text-black">Reserva tu espacio</h2>
                   
                      <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    value={`Espacio a reservar: ${coworkSpace?.name} - Precio: ${coworkSpace?.price} usd /dia`}
                                    placeholder="Espacio de coworking"
                                    onChange={handleCoworkSpaceChange}
                                    className={`w-3/4 mx-auto bg-white border ${coworkSpaceError ? "border-red-500" : "border-indigo-300"
                                        } rounded-md py-2 px-4 focus:outline-none focus:border-indigo-600 dark:text-black`}
                                />
                                {coworkSpaceError && (
                                    <p className="text-red-500 mt-2" style={{ marginLeft: "92px" }}>Este campo es requerido.</p>
                                )}
                            </div>
                        </div>
                         <div className="mb-6">
                            <div className="flex flex-col">
                                <input
                                    type="date"
                                    value={date_from}
                                    placeholder="Fecha desde"
                                    onChange={handleDateFromChange}
                                    className={`w-3/4 mx-auto bg-white border ${dateFromError ? "border-red-500" : "border-indigo-300"
                                        } rounded-md py-2 px-4 focus:outline-none focus:border-indigo-600 dark:text-black`}
                                />
                                {dateFromError && (
                                    <p className="text-red-500 mt-2" style={{ marginLeft: "92px" }}>Este campo es requerido.</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-col">
                                <input
                                    type="date"
                                    value={date_to}
                                    placeholder="Fecha hasta"
                                    onChange={handleDateToChange}
                                    className={`w-3/4 mx-auto bg-white border ${dateToError ? "border-red-500" : "border-indigo-300"
                                        } rounded-md py-2 px-4 focus:outline-none focus:border-indigo-600 dark:text-black`}
                                />
                                {dateToError && (
                                    <p className="text-red-500 mt-2" style={{ marginLeft: "92px" }}>Este campo es requerido.</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    value={occupants}
                                    placeholder="Cantidad de ocupantes"
                                    onChange={handleOccupantsChange}
                                    className={`w-3/4 mx-auto bg-white border ${occupantsError ? "border-red-500" : "border-indigo-300"
                                        } rounded-md py-2 px-4 focus:outline-none focus:border-indigo-600 dark:text-black`}
                                />
                                {occupantsError && (
                                    <p className="text-red-500 mt-2" style={{ marginLeft: "92px" }}>La cantidad de ocupantes debe ser entre 1 y 20.</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ml-14"
                                />
                                <label
                                    htmlFor="checkbox"
                                    className="ml-2 block text-sm text-gray-900 dark:text-black"
                                >
                                    Confirmar reserva
                                </label>
                            </div>
                            {showCheckboxError && (
                                <p className="text-red-500 mt-2" style={{ marginLeft: "92px" }}>Por favor confirme su reserva</p>
                            )}
                        </div>
                        <div className="mb-6 flex justify-center mt-8">
                            <button
                                type="submit"
                                className="w-3/4 mx-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-900 focus:outline-none"
                            >
                                Reservar
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>

            <Footer />

        </>
    );
}
