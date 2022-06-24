import {NextPage} from "next";
import {useRouter} from "next/router";
import {Button, Card, Dropdown, Input, Spacer} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import api from "../../../../util/api";
import Product from "../../../../components/product";

const PlayerPage: NextPage = () => {

  const router = useRouter();
  const {teamCode, playerId} = router.query;

  const [nfcScanActive, setNfcScanActive] = useState<boolean>(false);

  const [weapons, setWeapons] = useState<any>();
  const [products, setProducts] = useState<any>();
  const [validWeapon, setValidWeapon] = useState<any>();

  const [playerName, setPlayerName] = useState<any>('');
  const [weaponId, setWeaponId] = useState<any>('');
  const [selectedProduct, setSelectedProduct] = useState<any>('');

  useEffect(() => {
    if (!teamCode) {
      return;
    }
    api().get('/api/teams/' + teamCode + '/weapons').then(({data}) => {
      setWeapons(data);
    });
    api().get('/api/teams/' + teamCode + '/products').then(({data}) => {
      setProducts(data);
    });
  }, [teamCode]);

  const changeWeapon = (e: any) => {
    const weaponId = e.target.value;
    let valid = false;
    weapons.forEach((weapon: any) => {
      if (weapon.name === weaponId) {
        setWeaponId(weaponId);
        setValidWeapon(true);
        valid = true;
      }
    })
    if (!valid) {
      setValidWeapon(false);
      setWeaponId(weaponId);
    }
  }

  const scanWeapon = async (e: any) => {
    if (nfcScanActive) {
      return;
    }
    try {
      const ndef = new (window as any).NDEFReader();
      await ndef.scan();
      ndef.addEventListener("reading", ({ message, serialNumber }: any) => {
        let selectedWeapon = ''
        weapons.forEach((weapon: any) => {
          if (weapon.nfc_id.toLowerCase() === serialNumber.toLowerCase()) {
            selectedWeapon = weapon.name;
          }
        });
        if (selectedWeapon) {
          setWeaponId(selectedWeapon);
          setValidWeapon(true);
        } else {
          alert("Kunne ikke finde et ledigt våben med det nfc tag");
        }
      });
      setNfcScanActive(true);
    } catch (error: any) {
      alert("Der skerte en fejl: (" + error.message + ")");
      setNfcScanActive(false);
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!validWeapon) {
      return;
    }

    const data = {
      name: playerName,
      weapon_id: weapons.find((weapon: any) => weapon.name === weaponId)?.id,
      product_id: selectedProduct
    }

    api().get('/sanctum/csrf-cookie').then(() => {
      api().post('/api/teams/' + teamCode + '/createPlayer', data, {responseType: "json"}).then(result => {
        setPlayerName('');
        setWeaponId('');
        setSelectedProduct('');
        router.push('/teams/' + teamCode);
      });
    });
  }

  return (
    <div>
      <div className="text-center py-6 md:py-20">
        <h1 className="text-5xl md:text-7xl">AUTOBALL</h1>
      </div>
      <form onSubmit={onSubmit}>
        <Card className="flex flex-col items-stretch items-center max-w-[500px] !m-auto !p-8">
          <Input label="Navn" size="lg" onChange={e => setPlayerName(e.target.value)}/>
          <Spacer/>
          <Input label="Våben nummer" size="lg" onChange={changeWeapon} value={weaponId}
                 status={weaponId ? (validWeapon ? 'success' : 'error') : 'default'}/>
          <Button onClick={(event) => scanWeapon(event)} type="button">Scan våben</Button>
          {products?.map((product: any) => (
            <div key={product.id}>
              <Spacer/>
              <Product product={product} selected={product.id === selectedProduct}
                       onClick={() => setSelectedProduct(product.id)}/>
            </div>
          ))}
        </Card>

        <Spacer/>

        <div className="flex flex-col items-center pb-10">
          <Button size="xl" type="submit">
            <span className="font-bold">Registere spiller</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PlayerPage;
