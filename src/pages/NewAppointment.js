import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import AppointmentsForm from "../components/Profile/AppointmentsForm";
import useHttp from "../hooks/use-http";
import {addAppointment} from '../lib/api';

function NewAppointment(props){
    const {sendRequest, status} = useHttp(addAppointment);
    const history = useHistory();
    const params = useParams();

    // const { userId } = params;
    // props.userId = userId;

    useEffect(() => {
        if(status === 'completed' ){
            history.push(`/appointments/:userId`);
        }
    },[status,history]);

    function addAppointmentHandler(appointmentData){
        sendRequest(appointmentData);
        
    };
    return <AppointmentsForm isLoading = {status === 'pending'} onAddAppointment={addAppointmentHandler} userId = {props.userId} />;
}

export default NewAppointment;