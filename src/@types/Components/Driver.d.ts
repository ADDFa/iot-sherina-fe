namespace Driver {
    type Driver = Record<string, any>

    interface AddDriverI {
        drivers: Driver[] | undefined
        setDrivers: React.Dispatch<React.SetStateAction<Driver[] | undefined>>
    }

    interface DeleteDriverI {
        id: string | number
        drivers: Driver[] | undefined
        setDrivers: React.Dispatch<React.SetStateAction<Driver[] | undefined>>
    }

    interface EditDriver {
        id: string | number
        drivers: Driver[] | undefined
        setDrivers: React.Dispatch<React.SetStateAction<Driver[] | undefined>>
    }
}
