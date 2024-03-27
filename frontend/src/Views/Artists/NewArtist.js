import React from 'react';
import Button from '../../components/Shared/Buttons/Button';
import TextInput from '../../components/Shared/Inputs/TextInput';
import { useApp } from '../../Context/AppContext';
import Scroll from '../../components/Shared/Layout/Scroll';
import * as ROUTES from '../../Constants/routes';
import './styles.scss';

function NewArtist() {
    const { navigate } = useApp();

    const onCreateArtistAndContinue = async (e) => {
        e.preventDefault()
        navigate(ROUTES.ARTIST_PAGE)
    }

    const onCreateArtistAndFinish = async (e) => {
        e.preventDefault()
        navigate(ROUTES.NEW_SONG)
    }


    return (
        <div className='wrapper'>
            <header className='header'>
                    <span className='label'>Favorites</span>
            </header>
            <section>
                <Scroll>
                    <form className='form--wrapper'>
                        <header>
                            <h1 className='form--title'>Sign In</h1>
                            <p className='form--tip'></p>
                        </header>
                        <div className='form--inputs'>
                            <TextInput
                                name='name'
                                label='Artist Name'
                                // value={name}
                                // setValue={setName}
                                // error={errors.name}
                            />
                            <TextArea
                                name='bio'
                                label='Artist Bio'
                                type='textarea'
                                // value={bio}
                                // setValue={setBio}
                                // error={errors.bio}
                            />
                        </div>
                        <div className='form--actions'>
                            <Button
                                label='Save & Continue'
                                styles='primary'
                                action={onCreateArtistAndContinue}
                                // disabled={Object.keys(errors).length}
                            />
                            <Button
                                label='Save & Finish'
                                styles='secondary'
                                action={onCreateArtistAndFinish}
                                // disabled={Object.keys(errors).length}
                            />
                        </div>
                    </form>
                </Scroll>
            </section>
        </div>
    )
}

export default NewArtist
