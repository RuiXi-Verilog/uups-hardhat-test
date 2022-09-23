# uups-hardhat-test
A quick sample on how to test whether your contracts "upgradeability" is correctly configured.

## Use
Fork this repo and install the dev env.
```
npx hardhat compile
npx hardhat test
```

## Files
- contracts/
  - MyTokenV1 <== the original upgradeable contract
  - MyTokenV2 <== the newer version of MyTokenV1, with a role-based AC
- test/
  - MyToken.test.js
    - test: deploys <== test whether MyTokenV1 fits the upgradeable patterns
    - test: upgrades <== test whether MyTokenV2 override MyTokenV1
    - test: addresses <== test whether V1 and V2 have the same proxy address
    - test: throw <== test if a broken upgrade is blocked by the plugin
    
