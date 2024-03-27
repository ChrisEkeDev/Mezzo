export const base = {
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
    whileHover: 'hover',
    whileTap: 'tap'
}

export const inOut = {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    whileHover: 'hover'
}

export const swell = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    },
    hover: {
        scale: 1.1
    }
}

export const menuFade = {
    hidden: {
        y: -10,
        x: 10,
        opacity: 0
    },
    visible: {
        y: 0,
        x: 0,
        opacity: 1
    }
}

export const menuDeco = {
    hidden: {
        y: -10,
        x: 10,
        opacity: 0,
        rotate: -180
    },
    visible: {
        y: 0,
        x: 0,
        opacity: 1,
        rotate: -180
    }
}


export const button = {
    hidden: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: .1
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: .1
        }
    },
    hover: {
        opacity: .5,
        scale: 1.1
    },
    tap: {
        scale: .08
    }
}

export const icon = {
    hidden: {
        opacity: 0,
        transition: {
            duration: .1
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: .1
        }
    },
    hover: {
        scale: 1.1
    },
}

export const buttonBase = {
    hidden: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: .1
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: .1
        }
    },
    hover: {
        opacity: 1
    },
    tap: {
        scale: .95
    }
}

export const textError = {
    hidden: {
        opacity: 0,
        x: 25
    },
    visible: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: -25
    }
 }

 export const authForm = {
    hidden: {
        opacity: 0,
        y: -25
    },
    visible: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: 25
    }
 }

 export const mediaInOut = {
    hidden: {
        opacity: 0,
        x: -15
    },
    visible: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: 15
    }
 }

 export const search = {
    hidden: {
        opacity: 0,
        x: 20,
        transition: {
            duration: .1
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: .1
        }
    },
 }
