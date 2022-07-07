let regular_email = /^[-_A-Za-z0-9]+.?[-_A-Za-z0-9]+@[-_A-Za-z0-9]+[.][A-Za-z]{2,4}$/
let regular_phone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

export const validateForm = (inputs)=>{
    let newInputs = [...inputs]
    let flag = true
    newInputs.map((elem)=>{
        if(elem.name === 'email'){
            let res = regular_email.test(elem.value)
            elem.isValid = res
            flag = flag ? res : false
            return elem
        } else if(elem.name === 'Phone number'){
            let res = regular_phone.test(elem.value)
            elem.isValid = res
            flag = flag ? res : false
            return elem
        } else{
            elem.isValid = elem.value.length >= 2? true: false
            flag = flag ? elem.isValid : false
            return elem
        }
    })
    return [flag, newInputs]
}

export const validateUserForm = (stateKey, elem)=>{
    let flag = true

    if(stateKey === 'email'){
        let res = regular_email.test(elem.value)
        res ? elem.parentElement.className = 'form_item' : elem.parentElement.className = 'form_item invalid_value'
        flag = flag ? res : false
    } else if(stateKey === 'phone_number'){
        let res = regular_phone.test(elem.value)
        res ? elem.parentElement.className = 'form_item' : elem.parentElement.className = 'form_item invalid_value'
        flag = flag ? res : false
    } else{
        elem.value.length < 2 ? elem.parentElement.className = 'form_item invalid_value' : elem.parentElement.className = 'form_item'
        flag = flag ? elem.value.length > 1 : false
    }
    return flag
}