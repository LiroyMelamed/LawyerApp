import { useState } from 'react';
// import { usePopup } from '../providers/PopUpProvider'; // assuming you're using some form of popup for errors
// import ErrorPopup from '../components/styledComponents/popups/ErrorPopup'; // same for this component

const useHttpRequest = (requestFunction, onSuccess, onFailure) => {
    const [isPerforming, setIsPerforming] = useState(false);
    // const { openPopup, closePopup } = usePopup();
    const [result, setResult] = useState(null);
    // const toast = useToast();

    const defaultOnFailure = (error) => {
        // openPopup(<ErrorPopup closePopup={closePopup} errorText={error?.data?.message} />)
        // toast.show(error?.data?.message, { type: 'danger' }); // Using toast for error messages in React Native
    };

    const performRequest = async (...args) => {
        console.log('performRequest');

        if (isPerforming) return;
        setIsPerforming(true);


        try {
            const data = await requestFunction(...args);
            console.log('data', data);


            if (data.status !== 200 && data.status !== 201) {

                if (onFailure) onFailure(data);
                else defaultOnFailure(data);

                setResult([]);

            } else {
                setResult(data.data || []);
                onSuccess?.(data.data);
            }
        } catch (err) {

            setResult([]);

            if (onFailure) onFailure(err);
            else defaultOnFailure(err);

        } finally {
            setIsPerforming(false);
        }
    };

    return {
        result: result ?? [],
        isPerforming: isPerforming,
        performRequest
    };
};

export default useHttpRequest;
