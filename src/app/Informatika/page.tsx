import React from "react";
import Image from "next/image";
import Navbar from "../../app/component/Navbar"
import logo from "../../../public/images/informatika.png"
import Course from "../../../public/images/course(2).png"
import Dosen from "../../../public/images/DosenInformatika.png"
import Mahasiswa from "../../../public/images/MahasiswaInformatika.png";

const PageInformatika: React.FC = () => {
  return (
    <div className="bg-[#F9F8F3;] p-10 ">
      <div><Navbar></Navbar></div>
      <div className="flex items-center mb-10 pt-4 ">
        <Image src={logo} alt="Logo" width={100} height={100} />
        <h1 className="ml-2 text-2xl font-bold text-black">Informatika</h1>
      </div>
      <div className="p-10 bg-[#929d90] flex items-center justify-center rounded-lg">
        <p className="font-semibold text-black text-[25px] text-center tracking-[0] leading-[20px]">
          <br />
          program Studi Informatika Didirikan Pada Tahun 2010 Dan Telah Meraih{" "}
          <br />
          <br />
          akreditasi A Pada Tanggal 16 September 2020. Sejak Awal Berdiri,
          Program <br />
          <br />
          studi Ini&nbsp;&nbsp;Telah Menjadi Pilihan Favorit Para Calon
          Mahasiswa Melalui berbagai <br />
          <br />
          jalur Masuk Ke Perguruan Tinggi. Semua Mata Kuliah Dalam Program Studi{" "}
          <br />
          <br />
          ini Bertujuan Untuk Menciptakan Lulusan Yang Memiliki Kualitas Tinggi,{" "}
          <br />
          <br />
          mandiri, Kreatif,dan Memiliki Kemampuan Analisis Yang Sistematis
          Dengan <br />
          <br />
          menggunakan Komputer.
        </p>
      </div>
      <div className="flex items-center justify-start space-x-4">
        <div className="flex flex-col items-center w-30">
          <Image src={Course} alt="Course" width={70} height={70} />
          <h2 className="ml-2 text-xl font-bold text-black pt-2">
            69 Matakuliah
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <Image src={Dosen} alt="Dosen" width={80} height={80} />
          <h3 className="ml-2 text-xl font-bold text-black pt-2">
            24 Staff Pengajar
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <Image src={Mahasiswa} alt="Mahasiswa" width={80} height={80} />
          <h2 className="ml-2 text-xl font-bold text-black pt-2">
            360 Mahasiswa
          </h2>
        </div>
      </div>
    </div>
  );
};
export default PageInformatika;
