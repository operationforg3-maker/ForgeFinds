* \# Project Blueprint
*   
* Ten dokument opisuje architekturę i logikę projektu "AkileuszCebulaRex". Użyj go jako głównego źródła prawdy (Single Source of Truth) przy generowaniu kodu, reguł bezpieczeństwa i logiki backendowej.  
*   
* \#\# 1\. Koncepcja i Główne Założenia  
*   
* \*\*Wizja:\*\* Zaufany portal społecznościowy dla poszukiwaczy okazji, który łączy dynamiczne "Gorące Okazje" z kuratorowanym katalogiem produktów.  
* \*\*Kluczowe Wyróżniki (USP):\*\*  
* 1\.  \*\*System Weryfikacji "Forge":\*\* Fizyczne testy produktów przez redakcję, gwarantujące rzetelność i budujące zaufanie.  
* 2\.  \*\*System Ocen "Karta Gracza":\*\* Autorski, wielowymiarowy system ocen (np. Trwałość, Jakość/Cena) zamiast prostej skali 1-5 gwiazdek.  
* \*\*Monetyzacja:\*\* 100% oparta na marketingu afiliacyjnym (prowizje od sprzedaży u partnerów).  
*   
* \#\# 2\. Stos Technologiczny  
*   
* \-   \*\*Framework:\*\* Next.js (z App Router i TypeScript)  
* \-   \*\*Stylizacja:\*\* Tailwind CSS  
* \-   \*\*Backend & Baza Danych:\*\* Ekosystem Firebase/Google Cloud  
*     \-   \*\*Uwierzytelnianie:\*\* Firebase Authentication  
*     \-   \*\*Baza Danych:\*\* Cloud Firestore (NoSQL)  
*     \-   \*\*Przechowywanie Plików:\*\* Firebase Storage  
*     \-   \*\*Logika Serverless:\*\* Cloud Functions for Firebase  
*     \-   \*\*Hosting:\*\* \*\*Firebase App Hosting\*\* (Zarządzane rozwiązanie dla frameworków webowych jak Next.js, które automatycznie integruje Cloud Run, Cloud Build i tradycyjny Firebase Hosting jako CDN).  
* \-   \*\*Wyszukiwanie:\*\* Algolia (dla zaawansowanego, szybkiego wyszukiwania i filtrowania)  
* \-   \*\*Automatyzacja:\*\* GitHub Actions dla CI/CD  
*   
* \#\# 3\. Architektura Danych (Cloud Firestore)  
*   
* \#\#\# Kolekcja: \`products\`  
*   
* Przechowuje kuratorowany katalog produktów.  
*   
* \`\`\`javascript  
* // /products/{productId}  
* {  
*   name: string,  
*   description: string,  
*   mainImageUrl: string, // URL do zoptymalizowanego obrazu w Storage  
*   category: string,  
*   subcategory: string,  
*   productUrl: string, // Oryginalny URL produktu  
*   affiliateUrl: string, // Główny link afiliacyjny  
*   price: number,  
*   originalPrice: number,  
*   isActive: boolean, // domyślnie true  
*   commission: { // Dane z API partnera  
*     rate: number,  
*     incentiveRate: number | null  
*   },  
*   ratingCard: { // System ocen "Karta Gracza"  
*     durability: number, // 1-5  
*     valueForMoney: number, // 1-5  
*     easeOfUse: number, // 1-5  
*     versatility: number | null // 1-5  
*   },  
*   verification: { // Status weryfikacji "Forge"  
*     status: 'unverified' | 'ordered' | 'delivered' | 'tested',  
*     deliveryTimeDays: number | null  
*   }  
* }  
*   
* // Subkolekcja: /products/{productId}/priceHistory/{timestamp}  
* {  
*   price: number,  
*   date: Timestamp  
* }  
*   
* // Subkolekcja: /products/{productId}/reviews/{reviewId}  
* {  
*   authorId: string, // UID użytkownika  
*   authorName: string,  
*   ratingCard: { /\* ... jak wyżej ... \*/ },  
*   content: string,  
*   createdAt: Timestamp  
* }


  ### **Kolekcja: `deals`**

Dynamiczne okazje dodawane przez społeczność i automatyzację.

* // /deals/{dealId}  
* {  
*   title: string,  
*   imageUrl: string | null,  
*   authorId: string, // UID użytkownika  
*   authorName: string,  
*   affiliateUrl: string, // Specyficzny link afiliacyjny dla tej okazji  
*   productUrl: string,  
*   createdAt: Timestamp,  
*   startTime: Timestamp | null,  
*   endTime: Timestamp | null,  
*   temperature: number, // Sumaryczna ocena społeczności  
*   status: 'pending' | 'approved' | 'rejected', // Domyślnie 'pending'  
*   isActive: boolean, // Domyślnie true  
*   linkedProductId: string | null, // Opcjonalne ID z kolekcji \`products\`  
*   promoCode: {  
*     code: string,  
*     minSpend: number | null,  
*     discount: string | number, // np. "10%" lub 10  
*     validFrom: Timestamp | null,  
*     validUntil: Timestamp | null  
*   } | null  
* }  
*   
* // Subkolekcja: /deals/{dealId}/comments/{commentId}  
* {  
*   authorId: string,  
*   authorName: string,  
*   content: string,  
*   createdAt: Timestamp  
* }  
*   
* // Subkolekcja dla Distributed Counter: /deals/{dealId}/votes/{voteId}  
* {  
*   userId: string,  
*   value: 1 | \-1,  
*   createdAt: Timestamp  
* }


  ### **Kolekcja: `users`**

Dane użytkowników. ID dokumentu to UID z Firebase Authentication.

* // /users/{userId}  
* {  
*   email: string,  
*   displayName: string,  
*   photoURL: string,  
*   role: 'user' | 'ambassador' | 'admin' | 'super-admin', // Domyślnie 'user'  
*   points: number, // Punkty grywalizacji  
*   level: number,  
*   totalTemperature: number, // Suma "temperatury" z dodanych okazji  
*   createdAt: Timestamp  
* }


  ## **4\. Logika Reguł Bezpieczeństwa (Firebase Security Rules)**

  ### **Kolekcja `products`:**

* **Read:** Każdy (nawet niezalogowany) może czytać aktywne produkty (`isActive == true`).  
* **Write (create, update):** Tylko użytkownicy z rolą `admin` lub `super-admin`.

  ### **Subkolekcja `reviews`:**

* **Read:** Każdy może czytać recenzje.  
* **Create:** Tylko zalogowani użytkownicy.  
* **Update/Delete:** Tylko autor recenzji (`request.auth.uid == resource.data.authorId`).

  ### **Kolekcja `deals`:**

* **Read:** Każdy może czytać okazje ze statusem `approved` i `isActive == true`. Użytkownicy z rolą `admin`/`super-admin` mogą czytać wszystkie.  
* **Create:** Tylko zalogowani użytkownicy mogą tworzyć okazje (zawsze ze statusem `pending`).  
* **Update:**  
  * Zalogowani użytkownicy: Mogą aktualizować tylko pole `temperature` (poprzez mechanizm głosowania).  
  * Admini: Mogą modyfikować wszystkie pola, w szczególności zmieniać `status` na `approved` lub `rejected`.

  ### **Subkolekcja `comments`:**

* **Read:** Każdy może czytać komentarze.  
* **Create:** Tylko zalogowani użytkownicy.  
* **Update/Delete:** Tylko autor komentarza.

  ### **Kolekcja `users`:**

* **Read:** Zalogowany użytkownik może czytać dane dowolnego innego użytkownika (dane publiczne profilu).  
* **Update:** Użytkownik może modyfikować tylko swój własny dokument (`request.auth.uid == userId`). Admin może modyfikować rolę użytkownika.

  ## **5\. Kluczowe Funkcje Chmurowe (Cloud Functions)**

  ### **`processCsvImport`**

* **Trigger:** HTTP Request (z Panelu Admina).  
* **Cel:** Przetwarzanie przesłanego pliku CSV w celu masowego dodawania/aktualizowania produktów lub okazji.  
* **Logika:** Parsuje plik CSV, waliduje dane i tworzy/aktualizuje dokumenty w Firestore w trybie batch.

  ### **`onImageUpload`**

* **Trigger:** `storage.onFinalize` (nowy plik wgrany do Firebase Storage).  
* **Cel:** Automatyczna optymalizacja obrazów.  
* **Logika:** Po wgraniu obrazu (np. `mainImageUrl`), funkcja tworzy zoptymalizowane wersje (np. różne rozmiary, format .webp) i zapisuje je z powrotem do Storage.

  ### **`syncToAlgolia`**

* **Trigger:** `firestore.onWrite` (dla kolekcji `products` i `deals`).  
* **Cel:** Utrzymanie spójności danych między Firestore a indeksem wyszukiwania Algolia.  
* **Logika:** Po utworzeniu/aktualizacji/usunięciu dokumentu w Firestore, funkcja wykonuje analogiczną operację na odpowiednim rekordzie w Algolii. Aktualizuje tylko obiekty `approved` i `active`.

  ### **`aggregateDealVotes`**

* **Trigger:** `scheduler.onRun` (uruchamiana cyklicznie, np. co 1 minutę).  
* **Cel:** Agregacja głosów z subkolekcji `votes` w celu uniknięcia "hotspottingu".  
* **Logika:** Zlicza nowe dokumenty w subkolekcjach `votes` dla ostatnio aktywnych okazji, aktualizuje pole `temperature` w głównym dokumencie `deal`, a następnie usuwa przetworzone dokumenty głosów.

  ### **`scanPartnerApiForDeals`**

* **Trigger:** `scheduler.onRun` (uruchamiana cyklicznie, np. co 1 godzinę).  
* **Cel:** Automatyczne wyszukiwanie nowych okazji u partnerów.  
* **Logika:** Odpytuje API partnerów (np. AliExpress), parsuje wyniki i jeśli znajdzie interesującą promocję, tworzy nowy dokument w kolekcji `deals` ze statusem `pending` do weryfikacji przez admina.

  ## **6\. Architektura Frontend (Next.js & App Router)**

* `/layout.tsx`: Główny layout z `Navbar` i `Footer`.  
* `/page.tsx`: Strona główna z miksem polecanych produktów i gorących okazji.  
* `/products/page.tsx`: Lista produktów (katalog) z filtrowaniem (korzysta z Algolii).  
* `/products/[id]/page.tsx`: Szczegóły produktu z "Kartą Gracza", historią cen i recenzjami.  
* `/deals/page.tsx`: Lista gorących okazji, sortowana po "temperaturze".  
* `/deals/[id]/page.tsx`: Szczegóły okazji z komentarzami.  
* `/search/page.tsx`: Strona wyników wyszukiwania (backend by Algolia).  
* `/profile/[userId]/page.tsx`: Publiczny profil użytkownika z jego aktywnością i odznakami.  
* `/admin/page.tsx`: Główny dashboard panelu admina (chroniony).  
* `/admin/products`, `/admin/deals`, `/admin/users`: Podstrony do zarządzania treścią.  
* 

