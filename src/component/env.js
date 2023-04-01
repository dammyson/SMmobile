const stage = 'live';

const identity_url = 'https://ids.paychange.ng';
const identity_url_test = 'https://ids.test.paychange.ng';

const wallet_url = 'https://wallet.paychange.ng';
const wallet_url_test = 'https://wallet.test.paychange.ng';

const bill_url = 'https://bs.paychange.ng';
const bill_url_test = 'https://bs.test.paychange.ng';

const donattion_url = 'https://donations.paychange.ng';
const donattion_url_test = 'https://donations.test.paychange.ng';

const paystack_test_key = 'pk_test_45196fc3b9df26a8863f75d8bc6c6221a77b289a';
const paystack_live_key = 'pk_live_3306d8098964f020dffa793c158560f5e52aa1f0';

const fluter_live_keys =['', '' , '']
const fluter_test_keys =['FLWPUBK_TEST-b53ee6cc1532a03818b6fed853ba9f9c-X', 'FLWSECK_TEST-bf8da512d554cd593b95ee9224d26067-X' , 'FLWSECK_TESTebc0d10965d5']

export const getWalletUrl = () => {
    if( stage == 'test')
      return  wallet_url_test;
    else 
        return  wallet_url;
};


export const getIdentitytUrl = () => {
    if( stage == 'test')
      return  identity_url_test;
    else 
      return  identity_url
};


export const getBilltUrl = () => {
    if( stage == 'test')
      return  bill_url_test;
    else 
      return  bill_url;
};

export const getDonationUrl = () => {
  if( stage == 'test')
    return  donattion_url_test;
  else 
    return  donattion_url;
};

export const getPaystackKey = () => {
    if( stage == 'test')
      return  paystack_test_key;
    else 
      return  paystack_live_key;
};


export const getFluterKey = () => {
  if( stage == 'test')
    return  fluter_test_keys;
  else 
    return  fluter_live_keys;
};






