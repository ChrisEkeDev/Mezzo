import React from 'react';
import Button from '../../components/Shared/Buttons/Button';
import TextInput from '../../components/Shared/Inputs/TextInput';
import { useApp } from '../../Context/AppContext';
import Scroll from '../../components/Shared/Layout/Scroll';
import * as ROUTES from '../../Constants/routes';

function NewSong() {
    const { navigate } = useApp();

    const onCreateSongAndContinue = async (e) => {
        e.preventDefault()
        navigate(ROUTES.NEW_SONG)
    }

    const onCreateSongAndFinish = async (e) => {
        e.preventDefault()
        navigate(ROUTES.ARTIST_PAGE)
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
                            {/* <SelectInput
                                name='artist'
                                label='Artist Name'
                                data={[]}
                                // value={name}
                                // setValue={setName}
                                // error={errors.name}
                            /> */}
                            <TextInput
                                name='name'
                                label='Song Name'
                                // value={bio}
                                // setValue={setBio}
                                // error={errors.bio}
                            />
                            {/* <TextAreaInput
                                name='description'
                                label='Song Description'
                            />
                            <MediaUpload
                                name={song}
                                label="Select a file"
                            /> */}
                        </div>
                        <div className='form--actions'>
                            <Button
                                label='Save & Add Another'
                                styles='primary'
                                action={onCreateSongAndContinue}
                                // disabled={Object.keys(errors).length}
                            />
                            <Button
                                label='Save & Finish'
                                styles='secondary'
                                action={onCreateSongAndFinish}
                                // disabled={Object.keys(errors).length}
                            />
                        </div>
                    </form>
                </Scroll>
            </section>
        </div>
  )
}

export default NewSong
