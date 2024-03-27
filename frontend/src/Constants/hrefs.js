import { PiPlayFill, PiMusicNotesPlusBold,PiListPlusFill, PiHouseBold, PiMusicNotesBoldFill, PiPlaylistBold,  PiPlaylistFill , PiListPlusBold,PiHeartStraightBold, PiMusicNotesPlusFill, PiMicrophoneStageBold,PiMusicNotesBold,   PiMicrophoneStageFill, PiHeartStraightFill, PiMusicNotesFill, PiPlayBold  } from "react-icons/pi";
import * as ROUTES from './routes';

export const asideHrefs = [
    {
       label: "Now Playing",
       activeIcon: PiPlayFill,
       inactiveIcon: PiPlayBold,
       path: ROUTES.NOW_PLAYING
    },
    {
        label: "Artists",
        activeIcon: PiMicrophoneStageFill,
        inactiveIcon: PiMicrophoneStageBold,
        path: ROUTES.ARTISTS
    },
    {
        label: "Songs",
        activeIcon: PiMusicNotesFill,
        inactiveIcon: PiMusicNotesBold,
        path: ROUTES.SONGS
    },
    {
        label: "Favorites",
        activeIcon: PiHeartStraightFill,
        inactiveIcon: PiHeartStraightBold,
        path: ROUTES.FAVORITES
    },
]

export const asidePlaylistsHrefs = [
    {
       label: "New Playlist",
       activeIcon: PiListPlusFill,
       inactiveIcon: PiListPlusBold,
       path: ROUTES.NEW_PLAYLIST
    },
    {
        label: "All Playlists",
        activeIcon: PiPlaylistBold,
        inactiveIcon: PiPlaylistFill,
        path: ROUTES.ALL_PLAYLISTS
    }
]

export const asideUserHrefs = [
    {
        label: "Create New",
        activeIcon: PiMusicNotesPlusFill,
        inactiveIcon: PiMusicNotesPlusBold,
        path: ROUTES.CREATE_NEW
    },
    {
       label: "My Music",
       activeIcon: PiMicrophoneStageFill,
       inactiveIcon: PiMicrophoneStageBold,
       path: ROUTES.MY_MUSIC
    }
]
