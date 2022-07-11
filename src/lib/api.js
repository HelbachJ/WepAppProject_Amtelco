const FIREBASE_DOMAIN =
  "https://webapp-appointments-default-rtdb.firebaseio.com";

export async function getAllAppointments(appointmentData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/appointments/${appointmentData}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch appointments.");
  }

  const transformedAppointments = [];

  for (const appointmentData in data) {
    const appointmentObj = {
      id: appointmentData,

      ...data[appointmentData],
    };

    transformedAppointments.push(appointmentObj);
  }

  return transformedAppointments;
}

export async function getSingleAppointment(appointmentId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/appointments/${appointmentId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch appointment.");
  }

  const loadedAppointment = {
    id: appointmentId,
    ...data,
  };

  return loadedAppointment;
}

export async function addAppointment(appointmentData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/appointments/${appointmentData.localId}.json`,
    {
      method: "POST",
      body: JSON.stringify(appointmentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create appointment.");
  }

  return null;
}

export async function UpdateAppointment(appointmentObj) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/appointments/${appointmentObj.localId}/${appointmentObj.id}.json`,
    {
      method: "PUT",
      body: JSON.stringify(appointmentObj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not edit appointment.");
  }

  return null;
}
