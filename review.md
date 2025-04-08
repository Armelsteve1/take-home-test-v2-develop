**Technical Review**

```
1. Architecture générale:
``` 
    . Backend en Ts/Nodejs avec Express et TypeORM
    . Frontend en React, React Query, Ts.
    . Conteneurisation via Docker
    . Utilisation de service pour la logique métier backend
    . Découpage du front (Components, Hooks,  Types, Pages, Forms, Utils...)


```
2. Points positifs
```
    . Séparation propre des entités, services, contrôleurs.
    . Utilisation de React Query (useQuery/useMutation) trés bon choix pour une gestion des états serveur.
    . Utilisation de Typescript sur dans les deux parties du projet. 
    . Utilisation de TypeORM.
    . Organisation modulaire.
    . Formulaire bien séparé.

```
3. Axes d'amélioration
```
    $$
    3.1 Back-end
    $$
        . Pas de validation de données (aucune validation avec # class-validator ou  # joi).
        . Pas de gestion centralisée des erreurs (pas de middleware globale # errorHandler, bien que # middlewares.ts existe, il peut être enrichi).
        . Pas de test unitaire (0 test🥲)
        . Pas de typage précis dans les réponses API
        . Utilisation d'une ancienne version TypeORM (problèmes de compatibilité si jamais `getRepository` est déprécié totalement)

    $$
    3.2 Front-End
    $$
        . Répétition dans les formulaires (# CreateIngredientForm,# CreateRecipesForm, # CreateShoppingListForm, partagent beaucoup de logique).
        . Manque de retour utilisateur (erreur API, submit).
        . Test front manquants (Api.test.tsx existe mais vide, faut faire un test minimum sur un formulaire)


```
4. Recommandations
```
    . Ajouter une validation avec # class-validator.
    . Implementer un middleware # errorHanler.
    . Couvrir à 100% les tests côté backend.
    . Ajouter des # toasts pour le feedback utilisateur.
    . Factoriser les formulaires avec un hook type useFormHandler.
    . Ajouter des tests côté frontend sur au moins un formulaire (ex: CreateIngredientForm.test.tsx)
    . Adapter UI/UX et rendre les pages responsive.
    .Migration vers une version de TypeORM > v0.3+ 
