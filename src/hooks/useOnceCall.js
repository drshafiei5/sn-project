import * as React from 'react';

const useOnceCall = (callback, condition = true) => {
    const calledOnce  = React.useRef(false);

    React.useEffect(() => {
        if (!calledOnce.current && condition) {
            callback();
            calledOnce.current = true;
        }
    }, [callback, condition]);
}

export default useOnceCall;