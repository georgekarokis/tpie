#!/usr/bin/env python3
"""Endpoint verification for TPIE v6.2"""
import os
import requests

ENDPOINTS = [
    ("https://nova.arbitrum.io/rpc", "Arbitrum Nova RPC"),
    ("https://api.biconomy.io/api/v2/meta-tx/native", "Biconomy Relay"),
    ("https://sequencer.base.org/health", "Base Sequencer"),
    ("https://api.celestia.da/status", "Celestia DA"),
    ("https://api.eigenda.xyz/health", "EigenDA"),
    ("https://ethgasstation.info/api/ethgasAPI.json", "ETH Gas Station"),
    ("https://relay.gelato.digital", "Gelato Relay"),
    ("https://openapi.orbiter.finance/sdk/routers", "Orbiter Bridge"),
    ("https://api.tornado.nova", "Tornado Nova"),
    (f"https://mainnet.infura.io/v3/{os.getenv('INFURA_KEY', 'test')}", "Infura RPC")
]

def verify_endpoints():
    print("Testing all required endpoints...\n")
    all_ok = True
    
    for url, name in ENDPOINTS:
        try:
            if "infura" in url:
                payload = {"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}
                response = requests.post(url, json=payload, timeout=5)
                status = response.status_code
                result = "✓" if status == 200 else "✗"
            else:
                response = requests.get(url, timeout=5)
                status = response.status_code
                result = "✓" if status < 500 else "✗"
            
            print(f"{result} {name} ({url})")
            if result == "✗":
                all_ok = False
        except Exception as e:
            print(f"✗ {name} ({url}) - Error: {str(e)[:100]}")
            all_ok = False
    
    print("\nVerification complete.")
    print("✓ All systems operational" if all_ok else "✗ Some services unavailable")
    return all_ok

if __name__ == "__main__":
    verify_endpoints()