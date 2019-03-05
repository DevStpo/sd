import React from 'react'

const ModalContext = React.createContext('hola')

export const ModalProvider = ModalContext.Provider
export const ModalConsumer = ModalContext.Consumer
