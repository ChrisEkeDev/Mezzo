import React, { useRef } from 'react';
import { AnimatePresence, motion, LayoutGroup  } from 'framer-motion';
import Button from '../Buttons/Button';
import { FILE_TYPES } from '../../../Constants';
import { PiWarningCircleBold } from 'react-icons/pi'
import { inOut, textError } from '../../../Constants/animations';
import './styles.scss';

function MediaInput(props) {
    const { label, name, error, setValue, disabled, value, accept, placeholder } = props;
    const fileInputRef = useRef(null);

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const getPreviewType = () => {
        switch(accept) {
            case FILE_TYPES.IMAGE: return <audio></audio>; break;
            case FILE_TYPES.AUDIO: return <img/>; break;
            default: break;
        }
    }


    return (
        <LayoutGroup>
            <motion.label layout htmlFor={name} className='input--wrapper input--media--wrapper'>
                { label && <motion.span className='tint sm'>{label}</motion.span> }
                <motion.p className={`input--tip sm tint ${!value && 'input--tip--error' }`}>
                { value ? value.name : placeholder}
                </motion.p>
                {value && getPreviewType()}

                <div>
                    <motion.input
                        id={name}
                        onChange={setValue}
                        accept={accept}
                        ref={fileInputRef}
                        name={name}
                        type='file'
                        disabled={disabled}
                        className='input--file'
                    />
                    <Button
                        label="Select File"
                        styles="secondary input--button"
                        action={handleFileSelect}
                    />
                </div>

                <AnimatePresence>
                {
                    error &&
                    <motion.div {...inOut} variants={textError} layout className='input_error--wrapper'>
                        <PiWarningCircleBold className='input_error--icon'/>
                        <small className='input_error--label xs'>
                            <em>{error}</em>
                        </small>
                    </motion.div>
                }
                </AnimatePresence>

            </motion.label>
        </LayoutGroup>
    )
}

export default MediaInput
