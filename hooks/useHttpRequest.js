import { useState } from 'react';
import { Alert } from 'react-native';

const useHttpRequest = (requestFunction, onSuccess, onFailure) => {
    const [isPerforming, setIsPerforming] = useState(false);
    const [result, setResult] = useState(null);

    const defaultOnFailure = (error) => {
        console.log('error', error);

        const errorMessage = error?.data?.message || error?.message || "אירעה שגיאה לא צפויה";

        Alert.alert(
            "אופס...",
            errorMessage,
            [{ text: "אישור" }]
        );
    };

    const performRequest = async (...args) => {
        if (isPerforming) return;
        setIsPerforming(true);

        try {
            const data = await requestFunction(...args);

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
        isPerforming,
        performRequest
    };
};

export default useHttpRequest;

