### Gerekli Kurulumlar

* Angular 13+
* Node

## Nasıl Çalıştırılır?

> #### Projenin çalıştırabilmesi için terminalde aşağıdaki komutların çalıştırılması gerekmektedir:
* `npm install`
> #### Ardından uygulamanın çalışır hale gelebilmesi için aşağıdaki kod parçası terminallerde çalıştırılmalıdır:
* `ng serve`
> #### Bu komutların ardından uygulama *[localhost:4200](http://localhost:4200/)* portunda çalışır hale gelmektedir.


## Uygulama Ne Yapar?
* *[localhost:4200/](http://localhost:4200/)* adresinde arama butonundan film arayabilir ve aradığınız filme tıklayarak detaylarına gidebilirsiniz. Film ekle butonuna basarak zorunlu tüm alanları doldurduktan sonra film ekleyebilirsiniz.(Film görseli için resim adresi vermeniz gerekmektedir). Film listesi butonuna tıklayarak ise tüm filmleri listeleyebilirsiniz.
* *[localhost:4200/movies-list](http://localhost:4200/movies-list)* adresinden eklenmiş olan tüm filmleri listeleyebilirsiniz. Filmler default olarak en yüksek tarihten en düşüğe doğru sıralanmış halde gelir (aynı tarihte 2 film varsa imdbsi yüksek olan önce gösterilir). Film başlığı ile arama yaparak film bulabilirsiniz. Filmleri yıla , imdb puanına ve türüne göre filtreleyebilirsiniz. Filmleri imdb veya tarihe göre artan , azalan şeklinde sıralayabilirsiniz. Film resminin üzerine geldiğiniz zaman filmin açıklamasını görebilirsiniz. Filmleri ilgili kartın sağ altından silebilir ve sol altından ismini ve imdbsini düzenleyebilirsiniz.

## Uygulama İle İlgili Notlar

* Proje ilk ayağa kaldırıldığında omdb apiden filmleri çeker. Fakat omdb apiden tüm filmleri çekmek istediğinizde too many result hatası alındığından dolayı örnek olsun diye sadece 'GAME' içeren filmlerden ilk 10 tanesi çekilmiştir. Çekilen bu datada istenilen bazı bilgilerin olmamasından dolayı datadan bize dönen Imdbid ile filmlere tek tek istek atılıp gerekli tüm bilgiler tamamlanmıştır.
* Film eklerken girilmesi gereken film başlığı sadece alfanümerik karakterler kabul edilmiştir. Fakat bunlara ek opsiyonel olarak Türkçe karakterler (çöğüış) eklenmiştir.
* Oluşturulan ve en başta çekilen tüm veriler localStorage üzerinden yönetilmektedir. Eğer localStorage'den movies parametresi silinirse anasayfa ilk yüklendiğinde tekrar çekilecektir.
* `ng test` komutu ile unit testler çalıştırılabilir.
* `ng lint` komutu ile eslint dosyasında belirtmiş olduğum kurallara uyulup uyulmadığı kontrol edilebilir.

