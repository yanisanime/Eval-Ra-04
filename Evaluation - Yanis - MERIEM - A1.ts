

//Exercice outil de test

//Objectif : - Créer une suite de tests et de la nommer.
// - Ajouter plusieurs versions d'un algorithme.
// - Configurer le nombre de fois que chaque version de l'algorithme sera exécutée.
// - Transmettre les mêmes paramètres à chaque version de l'algorithme.
// - Afficher la performance moyenne (en millisecondes) de chaque version de l'algorithme.
// - Affiche la version la plus rapide et la plus lente.

class TestSuite {
  // Propriétés de la classe, un nom de la série de test puis un tableau d'algorithmes
  name: string;
  algorithms: Array<{  
    name: string;  
    func: (...args: any[]) => void;  
    iterations: number;  
  }>;  
  
  constructor(name: string) {
    this.name = name;
    this.algorithms = [];
  }

  //Méthode pour ajouter un algorithme, on a 10 itération par défault
  addAlgorithm(name, func, iterations = 10) {
    this.algorithms.push({ name, func, iterations });
  }

  //Méthode pour exécuter les test
  runTests(params) {
    console.log("\n--- Test Suite:", this.name, " ---");
    let results: Array<{ name: string; avgTime: number }> = [];  
    
    for (let algo of this.algorithms) 
    {
      let totalTime = 0;
      for (let i = 0; i < algo.iterations; i++) 
      {
        const start = performance.now(); //On démarre le chrono
        algo.func(...params);
        const end = performance.now(); //ici on arrête le chrono
        totalTime += (end - start);
      }
      
      let avgTime = totalTime / algo.iterations;
      results.push({ name: algo.name, avgTime }); // Ajout du nom et du temps moyen dans l tableau
      console.log(algo.name, " : ", avgTime, "ms");
    }
    
    //On tri rapidement le tableau  t on afficle es résultats
    results.sort((a, b) => a.avgTime - b.avgTime);
    console.log("\nLe plus rapide : ", results[0].name);
    console.log("\nLe plus lend : ", results[results.length - 1].name);
  }
}




//Exercice 1 

interface Artist {
    id: string;
    name: string;
  }
  
function findArtistIndex(artists, name) {
  for (let i = 0; i < artists.length; i++) {
    if (artists[i].name === name) {
      return artists[i].id;
    }
  }
  return -1;
}

//Version optimisée

// Version optimisée  
function findArtistIndexOpti(artists, name) {  
  let gauche = 0;  
  let droite = artists.length - 1;  

  while (gauche <= droite) {  
      const milieu = Math.floor((gauche + droite) / 2);  
      const artisteCourant = artists[milieu];  

      if (artisteCourant.name === name) { // Comparer le name  
          return artisteCourant.id; // Renvoie l'ID de l'artiste trouvé  
      } else if (artisteCourant.name < name) {  
          gauche = milieu + 1; // Cherche dans la moitié droite  
      } else {  
          droite = milieu - 1; // Cherche dans la moitié gauche  
      }  
  }  

  return -1; // Artiste non trouvé  
}  

/********************************************************* */  
// TEST  

const artistes = [  
  { id: '1', name: 'Adele' },  
  { id: '2', name: 'Coldplay' },  
  { id: '3', name: 'Ed' },  
  { id: '4', name: 'Lady' },  
  { id: '5', name: 'John' }  
];  

const nomRecherche = 'Ed';  

// const start = performance.now();  
// const resulte = findArtistIndex(artistes, nomRecherche);  
// const end = performance.now();  
// console.log("Version de base :", end - start, "résultat :", resulte);  

// const start2 = performance.now();  
// const resulte2 = findArtistIndexOpti(artistes, nomRecherche);  
// const end2 = performance.now();  
// console.log("Version optimisée :", end2 - start2, "résultat :", resulte2);  



//Exercice 1 


interface Artist {
  id: string;
  name: string;
  genre: string;
  stage: string;
}

interface Stage {
  id: string;
  name: string;
  genres: Array<string>;
}

function assignStages(artists, stages) {
  for (let stage of stages) {
    for (let artist of artists) {
      if (stage.genres.includes(artist.genre)) {
        artist.stage = stage.id;
        break;
      }
    }
  }
}

//Verison optimisé
//commentaire : Je pense que je perd du temps à recréé un dico avec les donnée des stages. Ce n'est donc pas une bonne idée
function assignStagesOpti(artists, stages)
{
  // ICI je créé un dictionnaire pour mapper chaque genre à sa scène  
  const genreToStageMap: { [key: string]: string } = {};

  // Il faut esuite remplir le dico
  for (let stage of stages) {  
    for (let genre of stage.genres) {  
      genreToStageMap[genre] = stage.id;  
    }  
  }  

  //ICI on fait l'assignation des scènes aux artistes
  for (let artist of artists) {  
    if (genreToStageMap[artist.genre]) {  
      artist.stage = genreToStageMap[artist.genre];  
    }  
  }  
}



/********************************************************* */
// TEST

const stages: Stage[] = [  
  { id: '1', name: 'Scène A', genres: ['Rock', 'Pop'] },  
  { id: '2', name: 'Scène B', genres: ['Jazz', 'Blues'] },  
  { id: '3', name: 'Scène C', genres: ['Classical', 'Opera'] },  
];  

const artistsBase: Artist[] = [  
  { id: '1', name: 'Artist 1', genre: 'Rock', stage: '' },  
  { id: '2', name: 'Artist 2', genre: 'Jazz', stage: '' },  
  { id: '3', name: 'Artist 3', genre: 'Classical', stage: '' },  
  { id: '4', name: 'Artist 4', genre: 'Pop', stage: '' },  
];  

// // Test pour la fonction de base  
// const start = performance.now();  
// const artistsCloneBase = JSON.parse(JSON.stringify(artistsBase)); // Créer une copie pour les tests  
// assignStages(artistsCloneBase, stages);  
// const end = performance.now();  
// console.log("Résultats de la version de base :");  
// console.log(artistsCloneBase); // Afficher les artistes avec leurs scènes  
// console.log("Temps d'exécution (version de base) :", end - start, "ms");  

// // Test pour la version optimisée  
// const start2 = performance.now();  
// const artistsCloneOpti = JSON.parse(JSON.stringify(artistsBase)); // Créer une autre copie  
// assignStagesOpti(artistsCloneOpti, stages);  
// const end2 = performance.now();  
// console.log("Résultats de la version optimisée :");  
// console.log(artistsCloneOpti); // Afficher les artistes avec leurs scènes  
// console.log("Temps d'exécution (version optimisée) :", end2 - start2, "ms");  




/**************************************************************/
//Parti ou je test ma fonction de test

function containsDuplicate(array) 
{
    for (let i = 0; i < array.length; i++) //T O(n)         S O(1)
    {
        for (let j = i + 1; j < array.length; j++) //T O(n)        S O(1)
        {
            if (array[i] === array[j]) //T O(1)
            {
                return true; //T O(1)
            }
        }
    }
    return false; //T O(1)
}

/*Version optimisé*/
function containsDuplicate2(array) 
{
    const checked = new Set(); 
    for (let i = 0; i < array.length; i++) 
    {
        if (checked.has(array[i])) 
        {
            return true; 
        }
        checked.add(array[i]); 
    }
    return false;
}



//ATENTION : J'ai du modifié légèrment l'écriture des fonction pour que tout marche en TS

function findCommonElements<T>(array1: T[], array2: T[]): T[] {  
  let commonElements: T[] = [];  

  for (let i = 0; i < array1.length; i++) {  
      for (let j = 0; j < array2.length; j++) {  
          if (array1[i] === array2[j]) {  
              commonElements.push(array1[i]);   
              break; 
          }  
      }  
  }  

  return commonElements;   
}  


/*Version optimisé*/
function findCommonElements2<T>(array1: T[], array2: T[]): T[] {  
  let commonElements: T[] = [];   
  let set2 = new Set(array2);  

  for (let i = 0; i < array1.length; i++) {  
      if (set2.has(array1[i])) {   
          commonElements.push(array1[i]);   
      }  
  }  

  return commonElements;   
}  




function fibonacci(n) {
  if (n <= 1) return n; // O(1) : condition de base.
  return fibonacci(n - 1) + fibonacci(n - 2); // O(2^n) : deux appels récursifs exponentiels.
}


function fibonacciMemo(n, memo = {}) {
  if (n <= 1) return n; // O(1) : condition de base.
  if (memo[n]) return memo[n]; // O(1) : vérification dans la mémoïsation.
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo); // O(n) : calcul récursif avec mémoïsation.
  return memo[n]; // O(1) : retour d'une valeur.
}


//Création de la suite de test
// const testSuite1 = new TestSuite("Evaluation - Yanis - MERIEM - A1 -- ContainDuplicate");
// const testSuite2 = new TestSuite("Evaluation - Yanis - MERIEM - A1 -- findCommonElements");
// const testSuite3 = new TestSuite("Evaluation - Yanis - MERIEM - A1 -- Fibonacci");

// testSuite1.addAlgorithm("containsDuplicate", containsDuplicate, 10);
// testSuite1.addAlgorithm("containsDuplicate2", containsDuplicate2, 10);
// testSuite2.addAlgorithm("assignStages", findCommonElements, 10);
// testSuite2.addAlgorithm("assignStagesOpti", findCommonElements2, 10);
// testSuite3.addAlgorithm("fibonacci", fibonacci, 10);
// testSuite3.addAlgorithm("fibonacciMemo", fibonacciMemo, 10);

// testSuite1.runTests([1, 2, 3, 4, 5, 6, 7, 8, 9, 1]);

// testSuite2.runTests([[1, 1, 1, 1,1, 1, 1,1, 1, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);


// testSuite3.runTests(4);