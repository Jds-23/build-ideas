import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useMemo } from "react";
import useWallet from "../state/wallet/hooks/useWallet";
import { SUPPORTED_NETWORKS } from "../constants/networks";

const useContract = (
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
) => {
  const { account, chainId } = useWallet();
  const chainIdStr = chainId
    ? `0x${chainId?.toString(16).toUpperCase()}`
    : "0x4";
  const library =
    SUPPORTED_NETWORKS[chainIdStr]?.rpcUrls[0] &&
    new ethers.providers.JsonRpcProvider(
      SUPPORTED_NETWORKS[chainIdStr].rpcUrls[0]
    );
  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [
    // addressOrAddressMap,
    ABI,
    // library,
    chainId,
    withSignerIfPossible,
    account,
  ]);
};

export function getContract(
  address: string,
  ABI: any,
  library: JsonRpcProvider,
  account?: string
): Contract {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}

// account is not optional
function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(
  library: JsonRpcProvider,
  account?: string
): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export default useContract;
