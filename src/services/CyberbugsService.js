import Axios from "axios"
import { DOMAIN_CYBERBUG } from "../util/constants/settingSystem"

export const cyberbugsService = {
    signInCyberBugs: (userLogin) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Users/signin`,
            method: "POST",
            data: userLogin
        })
    }
}

