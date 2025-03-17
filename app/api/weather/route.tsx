import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Istanbul"; // Şehir adı query parametresi, yoksa varsayılan olarak Istanbul kullanılır.

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data); // API'den gelen veriyi JSON formatında döndürüyoruz.
    } else {
      return NextResponse.json({ error: "Şehir bulunamadı!" }, { status: 400 }); // Şehir bulunamadıysa hata mesajı döndürüyoruz.
    }
  } catch (error) {
    return NextResponse.json({ error: "API ile iletişimde hata oluştu!" }, { status: 500 }); // Herhangi bir hata durumunda mesaj döndürüyoruz.
  }
}
