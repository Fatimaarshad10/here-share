import Chance from 'chance'
const chance = Chance()
export const allemail = ()=>{
return  chance.email({domain: "example.com"})
}
